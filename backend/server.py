from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt
from emergentintegrations.llm.chat import LlmChat, UserMessage
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionResponse, CheckoutStatusResponse, CheckoutSessionRequest

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

JWT_SECRET = os.environ.get('JWT_SECRET_KEY', 'fitness_secret')
JWT_ALGORITHM = os.environ.get('JWT_ALGORITHM', 'HS256')
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get('ACCESS_TOKEN_EXPIRE_MINUTES', 43200))

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')
STRIPE_API_KEY = os.environ.get('STRIPE_API_KEY')

# Models
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    email: str
    name: str
    is_premium: bool = False
    created_at: str
    age: Optional[int] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    fitness_goal: Optional[str] = None
    onboarding_completed: bool = False

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class Exercise(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    category: str
    muscle_group: str
    description: str
    instructions: List[str]

class WorkoutLogCreate(BaseModel):
    exercise_id: str
    exercise_name: str
    sets: int
    reps: int
    weight: float
    duration_seconds: Optional[int] = None
    notes: Optional[str] = None

class WorkoutLogResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    user_id: str
    exercise_id: str
    exercise_name: str
    sets: int
    reps: int
    weight: float
    duration_seconds: Optional[int] = None
    notes: Optional[str] = None
    date: str

class NutritionLogCreate(BaseModel):
    meal_name: str
    calories: float
    proteins: float
    carbs: float
    fats: float
    amino_acids: Optional[Dict[str, float]] = None

class NutritionLogResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    user_id: str
    meal_name: str
    calories: float
    proteins: float
    carbs: float
    fats: float
    amino_acids: Optional[Dict[str, float]] = None
    date: str

class AIRecommendationRequest(BaseModel):
    context: str
    user_goal: Optional[str] = None

class AIRecommendationResponse(BaseModel):
    recommendation: str
    generated_at: str

class CheckoutRequest(BaseModel):
    package_id: str
    origin_url: str

class ProfileUpdate(BaseModel):
    age: Optional[int] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    fitness_goal: Optional[str] = None
    onboarding_completed: Optional[bool] = None

class MoodEntryCreate(BaseModel):
    mood_level: int
    energy_level: int
    notes: Optional[str] = None

class MoodEntryResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    user_id: str
    mood_level: int
    energy_level: int
    notes: Optional[str] = None
    date: str

# Helper Functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    try:
        token = credentials.credentials
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        user = await db.users.find_one({"id": user_id}, {"_id": 0})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

# Predefined exercises database
PREDEFINED_EXERCISES = [
    {"id": "ex001", "name": "Développé Couché", "category": "Musculation", "muscle_group": "Pectoraux", "description": "Exercice de base pour les pectoraux", "instructions": ["Allongez-vous sur le banc", "Saisissez la barre", "Descendez lentement", "Poussez vers le haut"]},
    {"id": "ex002", "name": "Squat", "category": "Musculation", "muscle_group": "Jambes", "description": "Exercice de base pour les jambes", "instructions": ["Position pieds largeur épaules", "Descendez en gardant le dos droit", "Remontez en poussant sur les talons"]},
    {"id": "ex003", "name": "Soulevé de Terre", "category": "Musculation", "muscle_group": "Dos", "description": "Exercice complet pour le dos", "instructions": ["Saisissez la barre", "Gardez le dos droit", "Soulevez en utilisant les jambes", "Redescendez contrôlé"]},
    {"id": "ex004", "name": "Tractions", "category": "Musculation", "muscle_group": "Dos", "description": "Exercice au poids du corps pour le dos", "instructions": ["Saisissez la barre en pronation", "Tirez jusqu'à menton au niveau barre", "Redescendez contrôlé"]},
    {"id": "ex005", "name": "Développé Militaire", "category": "Musculation", "muscle_group": "Épaules", "description": "Exercice pour les épaules", "instructions": ["Debout ou assis", "Barre devant le cou", "Poussez vers le haut", "Redescendez contrôlé"]},
    {"id": "ex006", "name": "Curl Biceps", "category": "Musculation", "muscle_group": "Biceps", "description": "Isolation des biceps", "instructions": ["Debout coudes fixes", "Montez la barre", "Redescendez contrôlé"]},
    {"id": "ex007", "name": "Extensions Triceps", "category": "Musculation", "muscle_group": "Triceps", "description": "Isolation des triceps", "instructions": ["Bras au dessus tête", "Descendez l'haltère derrière", "Remontez en extension complète"]},
    {"id": "ex008", "name": "Fentes", "category": "Musculation", "muscle_group": "Jambes", "description": "Exercice unilatéral pour les jambes", "instructions": ["Pas en avant", "Descendez genou arrière près du sol", "Remontez", "Alternez"]},
]

# Auth Endpoints
@api_router.post("/auth/register", response_model=TokenResponse)
async def register(user_data: UserCreate):
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_id = f"user_{datetime.now(timezone.utc).timestamp()}"
    hashed_pwd = hash_password(user_data.password)
    
    user_doc = {
        "id": user_id,
        "email": user_data.email,
        "password": hashed_pwd,
        "name": user_data.name,
        "is_premium": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.users.insert_one(user_doc)
    
    token = create_access_token({"sub": user_id})
    user_response = UserResponse(
        id=user_id,
        email=user_data.email,
        name=user_data.name,
        is_premium=False,
        created_at=user_doc["created_at"]
    )
    
    return TokenResponse(access_token=token, token_type="bearer", user=user_response)

@api_router.post("/auth/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": user["id"]})
    user_response = UserResponse(
        id=user["id"],
        email=user["email"],
        name=user["name"],
        is_premium=user.get("is_premium", False),
        created_at=user["created_at"]
    )
    
    return TokenResponse(access_token=token, token_type="bearer", user=user_response)

@api_router.get("/auth/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    return UserResponse(**current_user)

@api_router.put("/auth/profile", response_model=UserResponse)
async def update_profile(profile_data: ProfileUpdate, current_user: dict = Depends(get_current_user)):
    update_fields = {k: v for k, v in profile_data.model_dump().items() if v is not None}
    
    if update_fields:
        await db.users.update_one(
            {"id": current_user["id"]},
            {"$set": update_fields}
        )
    
    updated_user = await db.users.find_one({"id": current_user["id"]}, {"_id": 0})
    return UserResponse(**updated_user)

# Exercise Endpoints
@api_router.get("/exercises", response_model=List[Exercise])
async def get_exercises(current_user: dict = Depends(get_current_user)):
    return [Exercise(**ex) for ex in PREDEFINED_EXERCISES]

@api_router.get("/exercises/{exercise_id}", response_model=Exercise)
async def get_exercise(exercise_id: str, current_user: dict = Depends(get_current_user)):
    exercise = next((ex for ex in PREDEFINED_EXERCISES if ex["id"] == exercise_id), None)
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return Exercise(**exercise)

# Workout Log Endpoints
@api_router.post("/workouts", response_model=WorkoutLogResponse)
async def create_workout_log(workout: WorkoutLogCreate, current_user: dict = Depends(get_current_user)):
    workout_id = f"workout_{datetime.now(timezone.utc).timestamp()}"
    
    workout_doc = {
        "id": workout_id,
        "user_id": current_user["id"],
        "exercise_id": workout.exercise_id,
        "exercise_name": workout.exercise_name,
        "sets": workout.sets,
        "reps": workout.reps,
        "weight": workout.weight,
        "duration_seconds": workout.duration_seconds,
        "notes": workout.notes,
        "date": datetime.now(timezone.utc).isoformat()
    }
    
    await db.workout_logs.insert_one(workout_doc)
    return WorkoutLogResponse(**workout_doc)

@api_router.get("/workouts", response_model=List[WorkoutLogResponse])
async def get_workout_logs(current_user: dict = Depends(get_current_user), limit: int = 50):
    workouts = await db.workout_logs.find({"user_id": current_user["id"]}, {"_id": 0}).sort("date", -1).limit(limit).to_list(limit)
    return [WorkoutLogResponse(**w) for w in workouts]

@api_router.get("/workouts/stats")
async def get_workout_stats(current_user: dict = Depends(get_current_user)):
    workouts = await db.workout_logs.find({"user_id": current_user["id"]}, {"_id": 0}).to_list(1000)
    
    total_workouts = len(workouts)
    total_sets = sum(w["sets"] for w in workouts)
    
    exercise_counts = {}
    for w in workouts:
        exercise_counts[w["exercise_name"]] = exercise_counts.get(w["exercise_name"], 0) + 1
    
    return {
        "total_workouts": total_workouts,
        "total_sets": total_sets,
        "favorite_exercise": max(exercise_counts.items(), key=lambda x: x[1])[0] if exercise_counts else None,
        "exercise_distribution": exercise_counts
    }

# Nutrition Endpoints
@api_router.post("/nutrition", response_model=NutritionLogResponse)
async def create_nutrition_log(nutrition: NutritionLogCreate, current_user: dict = Depends(get_current_user)):
    nutrition_id = f"nutrition_{datetime.now(timezone.utc).timestamp()}"
    
    nutrition_doc = {
        "id": nutrition_id,
        "user_id": current_user["id"],
        "meal_name": nutrition.meal_name,
        "calories": nutrition.calories,
        "proteins": nutrition.proteins,
        "carbs": nutrition.carbs,
        "fats": nutrition.fats,
        "amino_acids": nutrition.amino_acids or {},
        "date": datetime.now(timezone.utc).isoformat()
    }
    
    await db.nutrition_logs.insert_one(nutrition_doc)
    return NutritionLogResponse(**nutrition_doc)

@api_router.get("/nutrition", response_model=List[NutritionLogResponse])
async def get_nutrition_logs(current_user: dict = Depends(get_current_user), limit: int = 50):
    logs = await db.nutrition_logs.find({"user_id": current_user["id"]}, {"_id": 0}).sort("date", -1).limit(limit).to_list(limit)
    return [NutritionLogResponse(**log) for log in logs]

@api_router.get("/nutrition/stats")
async def get_nutrition_stats(current_user: dict = Depends(get_current_user), days: int = 7):
    from_date = datetime.now(timezone.utc) - timedelta(days=days)
    logs = await db.nutrition_logs.find(
        {"user_id": current_user["id"], "date": {"$gte": from_date.isoformat()}},
        {"_id": 0}
    ).to_list(1000)
    
    total_calories = sum(log["calories"] for log in logs)
    total_proteins = sum(log["proteins"] for log in logs)
    total_carbs = sum(log["carbs"] for log in logs)
    total_fats = sum(log["fats"] for log in logs)
    
    avg_calories = total_calories / days if days > 0 else 0
    
    return {
        "period_days": days,
        "total_calories": round(total_calories, 2),
        "total_proteins": round(total_proteins, 2),
        "total_carbs": round(total_carbs, 2),
        "total_fats": round(total_fats, 2),
        "avg_daily_calories": round(avg_calories, 2),
        "meal_count": len(logs)
    }

# AI Recommendations Endpoint
@api_router.post("/ai/recommendations", response_model=AIRecommendationResponse)
async def get_ai_recommendation(request: AIRecommendationRequest, current_user: dict = Depends(get_current_user)):
    if not current_user.get("is_premium", False):
        raise HTTPException(status_code=403, detail="Premium subscription required for AI recommendations")
    
    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"user_{current_user['id']}_recommendations",
            system_message="Tu es un coach fitness expert. Fournis des recommandations personnalisées sur l'entraînement et la nutrition en français. Sois concis et pratique."
        )
        chat.with_model("openai", "gpt-5.2")
        
        user_message = UserMessage(
            text=f"Contexte utilisateur: {request.context}\nObjectif: {request.user_goal or 'Non spécifié'}\n\nDonne des recommandations personnalisées pour améliorer les performances."
        )
        
        response = await chat.send_message(user_message)
        
        return AIRecommendationResponse(
            recommendation=response,
            generated_at=datetime.now(timezone.utc).isoformat()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

# Stripe Payment Endpoints
PREMIUM_PACKAGES = {
    "monthly": 9.99,
    "yearly": 99.99
}

@api_router.post("/payments/checkout", response_model=CheckoutSessionResponse)
async def create_checkout(request: CheckoutRequest, current_user: dict = Depends(get_current_user)):
    if request.package_id not in PREMIUM_PACKAGES:
        raise HTTPException(status_code=400, detail="Invalid package")
    
    amount = PREMIUM_PACKAGES[request.package_id]
    
    success_url = f"{request.origin_url}/premium/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{request.origin_url}/premium"
    
    webhook_url = f"{request.origin_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    checkout_request = CheckoutSessionRequest(
        amount=amount,
        currency="usd",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            "user_id": current_user["id"],
            "package_id": request.package_id,
            "email": current_user["email"]
        }
    )
    
    session = await stripe_checkout.create_checkout_session(checkout_request)
    
    payment_doc = {
        "session_id": session.session_id,
        "user_id": current_user["id"],
        "package_id": request.package_id,
        "amount": amount,
        "currency": "usd",
        "payment_status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.payment_transactions.insert_one(payment_doc)
    
    return session

@api_router.get("/payments/checkout/status/{session_id}", response_model=CheckoutStatusResponse)
async def get_checkout_status(session_id: str, current_user: dict = Depends(get_current_user)):
    webhook_url = f"{os.environ.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    status = await stripe_checkout.get_checkout_status(session_id)
    
    if status.payment_status == "paid":
        existing_transaction = await db.payment_transactions.find_one({"session_id": session_id, "payment_status": "completed"})
        
        if not existing_transaction:
            await db.payment_transactions.update_one(
                {"session_id": session_id},
                {"$set": {"payment_status": "completed", "updated_at": datetime.now(timezone.utc).isoformat()}}
            )
            
            await db.users.update_one(
                {"id": current_user["id"]},
                {"$set": {"is_premium": True, "premium_activated_at": datetime.now(timezone.utc).isoformat()}}
            )
    
    return status

@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("Stripe-Signature")
    
    webhook_url = f"{os.environ.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    try:
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        if webhook_response.payment_status == "paid":
            user_id = webhook_response.metadata.get("user_id")
            if user_id:
                await db.users.update_one(
                    {"id": user_id},
                    {"$set": {"is_premium": True}}
                )
        
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Progress Endpoints
@api_router.get("/progress/overview")
async def get_progress_overview(current_user: dict = Depends(get_current_user)):
    workouts = await db.workout_logs.find({"user_id": current_user["id"]}, {"_id": 0}).to_list(1000)
    nutrition = await db.nutrition_logs.find({"user_id": current_user["id"]}, {"_id": 0}).to_list(1000)
    
    workout_data = {}
    for w in workouts:
        date = w["date"][:10]
        if date not in workout_data:
            workout_data[date] = {"count": 0, "total_weight": 0}
        workout_data[date]["count"] += 1
        workout_data[date]["total_weight"] += w["weight"] * w["sets"] * w["reps"]
    
    nutrition_data = {}
    for n in nutrition:
        date = n["date"][:10]
        if date not in nutrition_data:
            nutrition_data[date] = {"calories": 0, "proteins": 0}
        nutrition_data[date]["calories"] += n["calories"]
        nutrition_data[date]["proteins"] += n["proteins"]
    
    return {
        "workout_progression": workout_data,
        "nutrition_progression": nutrition_data,
        "total_workouts": len(workouts),
        "total_meals_logged": len(nutrition)
    }

# Mood Tracker Endpoints
@api_router.post("/mood", response_model=MoodEntryResponse)
async def create_mood_entry(mood: MoodEntryCreate, current_user: dict = Depends(get_current_user)):
    mood_id = f"mood_{datetime.now(timezone.utc).timestamp()}"
    
    mood_doc = {
        "id": mood_id,
        "user_id": current_user["id"],
        "mood_level": mood.mood_level,
        "energy_level": mood.energy_level,
        "notes": mood.notes,
        "date": datetime.now(timezone.utc).isoformat()
    }
    
    await db.mood_logs.insert_one(mood_doc)
    return MoodEntryResponse(**mood_doc)

@api_router.get("/mood", response_model=List[MoodEntryResponse])
async def get_mood_history(current_user: dict = Depends(get_current_user), limit: int = 30):
    logs = await db.mood_logs.find({"user_id": current_user["id"]}, {"_id": 0}).sort("date", -1).limit(limit).to_list(limit)
    return [MoodEntryResponse(**log) for log in logs]

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
