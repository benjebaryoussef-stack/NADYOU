import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Apple, TrendingUp, Sparkles, User, LogOut, Heart, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const INSPIRATIONAL_PHRASES = [
  "La récupération fait partie de l'entraînement.",
  "Un corps écouté progresse plus longtemps.",
  "La constance bat la motivation.",
  "S'adapter, c'est performer intelligemment.",
  "L'intensité n'est efficace que si elle est cohérente.",
];

export const DashboardPage = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [inspirationalPhrase] = useState(INSPIRATIONAL_PHRASES[Math.floor(Math.random() * INSPIRATIONAL_PHRASES.length)]);

  // Mode démo - utiliser les données de l'onboarding
  const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
  const demoUser = {
    name: 'Utilisateur',
    is_premium: false,
    onboarding_completed: true,
    ...onboardingData
  };
  const currentUser = user || demoUser;

  // Objectifs nutritionnels (stockés localement)
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('nutritionGoals');
    return saved ? JSON.parse(saved) : { calories: 2000, proteins: 150, carbs: 250, fats: 70 };
  });

  // Récupérer les données de nutrition depuis localStorage
  const getNutritionStats = () => {
    const meals = JSON.parse(localStorage.getItem('nutritionMeals') || '[]');
    const today = new Date().toDateString();
    const todayMeals = meals.filter(m => new Date(m.date).toDateString() === today);
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const weekMeals = meals.filter(m => new Date(m.date) >= sevenDaysAgo);

    return {
      meal_count: meals.length,
      today_calories: todayMeals.reduce((sum, m) => sum + m.calories, 0),
      today_proteins: todayMeals.reduce((sum, m) => sum + m.proteins, 0),
      today_carbs: todayMeals.reduce((sum, m) => sum + m.carbs, 0),
      today_fats: todayMeals.reduce((sum, m) => sum + m.fats, 0),
      avg_daily_calories: weekMeals.length > 0 ? weekMeals.reduce((sum, m) => sum + m.calories, 0) / 7 : 0,
      total_proteins: weekMeals.reduce((sum, m) => sum + m.proteins, 0),
    };
  };

  // Récupérer les données d'entraînement depuis localStorage
  const getWorkoutStats = () => {
    const workouts = JSON.parse(localStorage.getItem('workoutLogs') || '[]');
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const weekWorkouts = workouts.filter(w => new Date(w.date) >= sevenDaysAgo);

    // Trouver l'exercice favori
    const exerciseCounts = {};
    weekWorkouts.forEach(w => {
      exerciseCounts[w.exercise_name] = (exerciseCounts[w.exercise_name] || 0) + 1;
    });
    const favoriteExercise = Object.keys(exerciseCounts).length > 0 
      ? Object.entries(exerciseCounts).sort((a, b) => b[1] - a[1])[0][0]
      : 'Aucun';

    return {
      total_workouts: weekWorkouts.length,
      total_sets: weekWorkouts.reduce((sum, w) => sum + (w.sets || 0), 0),
      total_reps: weekWorkouts.reduce((sum, w) => sum + ((w.sets || 0) * (w.reps || 0)), 0),
      favorite_exercise: favoriteExercise,
    };
  };

  const nutritionStats = getNutritionStats();
  const workoutStats = getWorkoutStats();

  const handleLogout = () => {
    localStorage.removeItem('onboardingData');
    localStorage.removeItem('onboardingCompleted');
    if (logout) logout();
    toast.success('À bientôt');
    navigate('/');
  };

  // Calcul du pourcentage pour les barres de progression
  const getProgressPercent = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getProgressColor = (percent) => {
    if (percent >= 100) return 'bg-green-500';
    if (percent >= 75) return 'bg-yellow-500';
    return 'bg-primary';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Dumbbell className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground font-light">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-white/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <span className="text-lg font-medium tracking-tight text-foreground">NADYOU</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                </div>
                <span className="hidden sm:inline font-medium">{currentUser.name}</span>
                {currentUser.is_premium && (
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">Premium</span>
                )}
              </div>
              <Button
                data-testid="logout-btn"
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4" strokeWidth={1.5} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 fade-in">
          <h1 className="text-4xl font-light text-foreground mb-3 tracking-tight">
            Bonjour, {currentUser.name}
          </h1>
          <p className="text-lg text-muted-foreground font-light italic">
            "{inspirationalPhrase}"
          </p>
        </div>

        {/* Objectifs du jour avec barres de progression */}
        <Card className="p-6 bg-white border border-border mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-medium">Objectifs du jour</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Calories */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Calories</span>
                <span className="font-medium">{Math.round(nutritionStats.today_calories)} / {goals.calories}</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getProgressColor(getProgressPercent(nutritionStats.today_calories, goals.calories))} transition-all duration-500`}
                  style={{ width: `${getProgressPercent(nutritionStats.today_calories, goals.calories)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.max(0, Math.round(goals.calories - nutritionStats.today_calories))} restantes
              </p>
            </div>

            {/* Protéines */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Protéines</span>
                <span className="font-medium">{Math.round(nutritionStats.today_proteins)}g / {goals.proteins}g</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getProgressColor(getProgressPercent(nutritionStats.today_proteins, goals.proteins))} transition-all duration-500`}
                  style={{ width: `${getProgressPercent(nutritionStats.today_proteins, goals.proteins)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.max(0, Math.round(goals.proteins - nutritionStats.today_proteins))}g restants
              </p>
            </div>

            {/* Glucides */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Glucides</span>
                <span className="font-medium">{Math.round(nutritionStats.today_carbs)}g / {goals.carbs}g</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getProgressColor(getProgressPercent(nutritionStats.today_carbs, goals.carbs))} transition-all duration-500`}
                  style={{ width: `${getProgressPercent(nutritionStats.today_carbs, goals.carbs)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.max(0, Math.round(goals.carbs - nutritionStats.today_carbs))}g restants
              </p>
            </div>

            {/* Lipides */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Lipides</span>
                <span className="font-medium">{Math.round(nutritionStats.today_fats)}g / {goals.fats}g</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getProgressColor(getProgressPercent(nutritionStats.today_fats, goals.fats))} transition-all duration-500`}
                  style={{ width: `${getProgressPercent(nutritionStats.today_fats, goals.fats)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.max(0, Math.round(goals.fats - nutritionStats.today_fats))}g restants
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card 
            data-testid="nav-card-workouts"
            className="p-8 bg-white border border-border hover:border-primary/50 cursor-pointer transition-all duration-300 hover:shadow-lg group"
            onClick={() => navigate('/workouts')}
          >
            <div className="flex items-center justify-between mb-6">
              <Dumbbell className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-3xl font-light text-foreground">{workoutStats.total_workouts}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Entraînements (7j)</h3>
          </Card>

          <Card 
            data-testid="nav-card-nutrition"
            className="p-8 bg-white border border-border hover:border-primary/50 cursor-pointer transition-all duration-300 hover:shadow-lg group"
            onClick={() => navigate('/nutrition')}
          >
            <div className="flex items-center justify-between mb-6">
              <Apple className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-3xl font-light text-foreground">{nutritionStats.meal_count}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Repas suivis</h3>
          </Card>

          <Card 
            data-testid="nav-card-mood"
            className="p-8 bg-white border border-border hover:border-primary/50 cursor-pointer transition-all duration-300 hover:shadow-lg group"
            onClick={() => navigate('/mood-tracker')}
          >
            <div className="flex items-center justify-between mb-6">
              <Heart className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <Sparkles className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Bien-être</h3>
          </Card>

          <Card 
            data-testid="nav-card-progress"
            className="p-8 bg-white border border-border hover:border-primary/50 cursor-pointer transition-all duration-300 hover:shadow-lg group"
            onClick={() => navigate('/progress')}
          >
            <div className="flex items-center justify-between mb-6">
              <TrendingUp className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-3xl font-light text-foreground">{workoutStats.total_sets}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Séries totales</h3>
          </Card>
        </div>

        {!currentUser.is_premium && (
          <Card data-testid="premium-upsell" className="p-10 bg-gradient-to-br from-accent/5 via-white to-accent/5 border border-accent/20 mb-12 slide-up">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-light">Accès Premium</h3>
                </div>
                <p className="text-muted-foreground font-light mb-6 max-w-2xl leading-relaxed">
                  Débloquez l'analyse IA approfondie, les recommandations personnalisées et les insights psycho-sportifs avancés.
                </p>
                <Button
                  data-testid="premium-upgrade-btn"
                  className="bg-accent hover:bg-accent/90 text-white"
                  onClick={() => navigate('/premium')}
                >
                  Découvrir Premium
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <Card data-testid="quick-stats" className="p-8 bg-white border border-border">
            <h3 className="text-xl font-medium mb-6 text-foreground">Vue d'ensemble (7 jours)</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground font-light">Exercice favori</span>
                <span className="font-medium text-foreground">{workoutStats.favorite_exercise}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground font-light">Calories moy./jour</span>
                <span className="font-medium text-foreground">{Math.round(nutritionStats.avg_daily_calories)}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground font-light">Protéines totales</span>
                <span className="font-medium text-foreground">{Math.round(nutritionStats.total_proteins)}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground font-light">Répétitions totales</span>
                <span className="font-medium text-foreground">{workoutStats.total_reps}</span>
              </div>
            </div>
          </Card>

          <Card data-testid="quick-actions" className="p-8 bg-white border border-border">
            <h3 className="text-xl font-medium mb-6 text-foreground">Actions rapides</h3>
            <div className="space-y-3">
              <Button
                data-testid="quick-action-workout"
                className="w-full justify-start bg-secondary/50 hover:bg-secondary text-foreground font-normal"
                variant="ghost"
                onClick={() => navigate('/workouts')}
              >
                <Dumbbell className="w-4 h-4 mr-3 text-primary" strokeWidth={1.5} />
                Enregistrer un entraînement
              </Button>
              <Button
                data-testid="quick-action-nutrition"
                className="w-full justify-start bg-secondary/50 hover:bg-secondary text-foreground font-normal"
                variant="ghost"
                onClick={() => navigate('/nutrition')}
              >
                <Apple className="w-4 h-4 mr-3 text-primary" strokeWidth={1.5} />
                Ajouter un repas
              </Button>
              <Button
                data-testid="quick-action-mood"
                className="w-full justify-start bg-secondary/50 hover:bg-secondary text-foreground font-normal"
                variant="ghost"
                onClick={() => navigate('/mood-tracker')}
              >
                <Heart className="w-4 h-4 mr-3 text-primary" strokeWidth={1.5} />
                Logger mon humeur
              </Button>
              <Button
                data-testid="quick-action-progress"
                className="w-full justify-start bg-secondary/50 hover:bg-secondary text-foreground font-normal"
                variant="ghost"
                onClick={() => navigate('/progress')}
              >
                <TrendingUp className="w-4 h-4 mr-3 text-primary" strokeWidth={1.5} />
                Voir ma progression
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};
