# 📋 HANDOFF COMPLET - NADYOU Performance

**Date :** 3 février 2026  
**URL App :** https://quick-preview-90.preview.emergentagent.com  
**Workspace :** /app

---

## 🎯 ÉTAT ACTUEL DU PROJET

### Positionnement
**NADYOU** est une application de **performance consciente premium** (pas une app de fitness classique).
- Ton : Calme, intelligent, bienveillant
- Cible : Sportifs réguliers cherchant équilibre performance/récupération
- Différenciation : IA adaptative + Intelligence émotionnelle

---

## 🎨 DESIGN SYSTEM (APPLIQUÉ)

### Palette de Couleurs
```
Fond principal : #F5F3F0 (beige minéral)
Texte principal : #2D3748 (anthracite)
Accent performance : #5B8A9F (bleu pétrole)
Accent premium : #8B5CF6 (violet - max 5%)
Border : #E5E1DC
```

### Typographie
```
Police : Inter uniquement (300-600)
Titres : font-light
Corps : font-light / font-medium
Stats : font-light avec chiffres plus gros
```

### Animations
```
Fade-in : 0.6s ease-in
Slide-up : 0.5s ease-out
Hover : scale-105, duration 300ms
```

---

## 💳 STRIPE CONFIGURATION

**Clé de TEST :**
```
sk_test_51Swlbl0dwWyijhzU1Jf192YwypfzFWlSObOOQN95hE3PV8QR2LSiJSKcsFcJdF8tcFVetKYEPrancIS8u5JhlHMz00Ra7fuYFd
```

**Plans d'abonnement :**
- Mensuel : 9.99 USD
- Annuel : 99.99 USD

**Fichier :** `/app/backend/.env`

---

## 🔑 CLÉS API

### OpenAI (pour analyse nutrition)
```
OPENAI_API_KEY=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
```

### Emergent LLM (pour IA Coach)
```
EMERGENT_LLM_KEY=sk-emergent-a298e8dD7816351E76
```

**Fichier :** `/app/backend/.env`

---

## 📁 STRUCTURE COMPLÈTE

### Backend Files
```
/app/backend/
├── server.py (FastAPI complet)
├── requirements.txt (à jour)
└── .env (toutes les clés)
```

### Frontend Files
```
/app/frontend/
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.css (design premium)
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── utils/
│   │   └── api.js
│   ├── pages/
│   │   ├── LandingPage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── ForgotPasswordPage.js
│   │   ├── ResetPasswordPage.js
│   │   ├── OnboardingPage.js (6 écrans premium)
│   │   ├── DashboardPage.js (design premium)
│   │   ├── WorkoutsPage.js
│   │   ├── NutritionPage.js
│   │   ├── ProgressPage.js
│   │   ├── AIPage.js
│   │   ├── AIExplanationPage.js (comment fonctionne l'IA)
│   │   ├── PremiumPage.js
│   │   └── MoodTrackerPage.js (intelligence émotionnelle)
│   └── components/ui/ (Shadcn components)
├── public/
│   └── index.html (Inter font)
├── tailwind.config.js (palette premium)
└── package.json
```

---

## 🔥 FONCTIONNALITÉS IMPLÉMENTÉES

### 1. Authentification ✅
- Inscription / Connexion JWT
- Mot de passe oublié (tokens 1h)
- Reset password
- Refresh user context

### 2. Onboarding Premium ✅ (6 écrans)
**Écran 0 :** Welcome avec dégradé
**Écran 1 :** Profil (sexe, âge, taille, poids)
**Écran 2 :** Objectif (performance, esthétique, équilibre, reprise)
**Écran 3 :** Relation au sport (exutoire, discipline, performance, obligation)
**Écran 4 :** Fréquence (1-2, 3-4, 5+/semaine)
**Écran 5 :** Sommeil & stress

**Champs sauvegardés :**
```javascript
{
  sex, age, height, weight,
  fitness_goal, sport_relation,
  training_frequency, sleep_hours,
  stress_level, onboarding_completed
}
```

### 3. Dashboard Premium ✅
- 4 cards : Entraînements, Nutrition, Bien-être, Progression
- Phrases inspirantes aléatoires (5 phrases)
- Upsell Premium si non-abonné
- Stats rapides et actions rapides

### 4. Mood & Energy Tracker ✅
**Micro-causes en 1 clic :**
- 😴 Fatigue
- 😟 Stress
- 🍔 Alimentation
- 💔 Émotionnel
- 💪 Motivation

**Insights automatiques :**
- Humeur moyenne 7j/30j
- Impact sport sur humeur
- Facteurs dominants
- Messages intelligents contextuels

**Graphiques :**
- Évolution humeur/énergie (14 jours)
- Facteurs dominants (bar chart)

### 5. IA Adaptative ✅
**Endpoint :** `GET /api/daily-recommendation`

**Logique :**
```
Si sommeil < 6h OU fatigue OU énergie ≤ 2
→ Recommandation : Récupération (yoga, mobilité)

Si stress élevé OU humeur ≤ 2
→ Recommandation : Stress management (yoga flow, cardio léger)

Si humeur ≥ 4 ET énergie ≥ 4 ET sommeil ≥ 7h
→ Recommandation : Performance (séance intensive)

Si 3 jours consécutifs humeur ≤ 2
→ Alerte : Adaptation charge recommandée
```

### 6. Page "Comment fonctionne notre IA" ✅
**Route :** `/ai/how-it-works`

**Contenu :**
- "L'IA ne remplace pas l'écoute du corps. Elle l'amplifie."
- 5 dimensions analysées
- Ce que fait l'IA (4 points)
- Ce que l'IA ne fait pas (3 points)
- Phrase finale : "Écouter son corps n'est pas un frein. C'est une stratégie."

### 7. Entraînements ✅
- Bibliothèque 8 exercices prédéfinis
- Enregistrement : séries, reps, poids, durée
- Chronomètre intégré
- Historique séances

### 8. Nutrition ✅
- Enregistrement repas manuel
- Calories, protéines, glucides, lipides
- Acides aminés (leucine, isoleucine, valine)
- Stats 7 jours

### 9. Progression ✅
- Graphiques entraînements (14 jours)
- Graphiques nutrition (14 jours)
- Partage social (préparé)

### 10. Premium / Stripe ✅
- Plans mensuel/annuel
- Intégration complète
- Webhook configuré
- Activation automatique Premium

---

## 🚧 EN COURS : Analyse Nutritionnelle Automatique

### Backend (FAIT ✅)
**Endpoints créés :**
```
GET /api/nutrition/search?query=poulet
→ Recherche dans base USDA
→ Retourne 8 suggestions

GET /api/nutrition/details/{fdc_id}
→ Récupère tous les nutriments automatiquement
→ Calories, protéines, glucides, lipides
→ Leucine, isoleucine, valine
```

**Fichier :** `/app/backend/server.py` (lignes après daily-recommendation)

### Frontend (À FAIRE ❌)
**Ce qui reste :**

1. **Ajouter fonctions API dans `/app/frontend/src/utils/api.js` :**
```javascript
// Nutrition Search
searchFood: (query) => axios.get(`${API}/nutrition/search`, { 
  params: { query }, 
  headers: getAuthHeader() 
}),
getFoodDetails: (fdcId) => axios.get(`${API}/nutrition/details/${fdcId}`, { 
  headers: getAuthHeader() 
}),
```

2. **Modifier `/app/frontend/src/pages/NutritionPage.js` :**
   - Remplacer champ "meal_name" par autocomplétion
   - Ajouter dropdown avec résultats recherche
   - Auto-remplir calories/protéines/glucides/lipides/acides aminés
   - Permettre ajustement portion (100g, 200g, etc.)

3. **Interface demandée :**
   - Bande déroulante apparaît dès 2 lettres tapées
   - Liste de suggestions (max 8)
   - Clic sur suggestion → calcul auto nutriments
   - Affichage temps réel des valeurs

**Exemple visuel fourni par utilisateur :** Image avec dropdown "blanc de poulet", "poulet grillé", etc.

---

## 📊 COLLECTIONS MONGODB

```javascript
users {
  id, email, password, name,
  is_premium, created_at,
  // Onboarding
  age, height, weight, sex,
  fitness_goal, sport_relation,
  training_frequency, sleep_hours,
  stress_level, onboarding_completed
}

workout_logs {
  id, user_id, exercise_id, exercise_name,
  sets, reps, weight, duration_seconds,
  notes, date
}

nutrition_logs {
  id, user_id, meal_name,
  calories, proteins, carbs, fats,
  amino_acids: { leucine, isoleucine, valine },
  date
}

mood_logs {
  id, user_id, mood_level, energy_level,
  factors: ["fatigue", "stress", ...],
  notes, date
}

payment_transactions {
  session_id, user_id, package_id,
  amount, currency, payment_status,
  created_at
}

password_resets {
  token, user_id, email,
  expires_at, used, created_at
}
```

---

## 🎯 PHRASES INSPIRANTES (Dashboard)

```javascript
[
  "La récupération fait partie de l'entraînement.",
  "Un corps écouté progresse plus longtemps.",
  "La constance bat la motivation.",
  "S'adapter, c'est performer intelligemment.",
  "L'intensité n'est efficace que si elle est cohérente."
]
```

Rotation aléatoire à chaque chargement.

---

## 🔧 COMMANDES UTILES

### Redémarrer services
```bash
sudo supervisorctl restart backend
sudo supervisorctl restart frontend
sudo supervisorctl restart backend frontend
```

### Vérifier status
```bash
sudo supervisorctl status
```

### Voir logs
```bash
tail -f /var/log/supervisor/backend.err.log
tail -f /var/log/supervisor/frontend.err.log
```

### Tester backend
```bash
API_URL=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)
curl "$API_URL/api/nutrition/search?query=poulet" -H "Authorization: Bearer TOKEN"
```

---

## 🎨 GUIDELINES DESIGN (Critiques)

### ❌ INTERDICTIONS
- Pas de dark mode agressif
- Pas d'orange vif / rouge saturé
- Pas de typo "sport extrême"
- Pas de capitales partout
- Pas d'emoji partout (sauf mood check)
- Pas de photos corps bodybuildés

### ✅ À RESPECTER
- Fond beige minéral doux
- Bleu pétrole pour accents
- Violet ≤5% écran
- Marges généreuses
- 1 message clé par écran
- Transitions lentes (0.5-0.6s)
- Icônes outline fines (strokeWidth: 1.5)
- Ton bienveillant, pas injonctif

---

## 🚀 PROCHAINES ÉTAPES

### Priorité 1 : Autocomplétion Nutrition ⏳
1. Ajouter fonctions API frontend
2. Créer composant autocomplétion
3. Intégrer dans NutritionPage
4. Tester avec "poulet", "riz", "banane"

### Priorité 2 : Finaliser Pages Restantes
- Adapter WorkoutsPage au design premium
- Adapter ProgressPage au design premium
- Adapter AIPage au design premium

### Priorité 3 : Intégrer Recommandations Dashboard
- Afficher recommandation IA du jour
- Call-to-action selon intensité

### Idées Futures
- Export PDF progression
- Notifications push rappels
- Intégration Apple Health / Google Fit
- Plans d'entraînement prédéfinis

---

## 📝 NOTES IMPORTANTES

1. **Backend déjà redémarré** après ajout endpoints nutrition
2. **USDA API** utilise "DEMO_KEY" (limité mais suffisant pour tests)
3. **OpenAI Key** ajoutée mais pas encore utilisée (prévue pour analyse photo repas)
4. **Stripe en mode TEST** - passer en LIVE avec clé `sk_live_...` quand prêt
5. **Emergent LLM Key** fonctionne pour OpenAI, Gemini, Claude (text uniquement)

---

## 🎯 OBJECTIF SESSION SUIVANTE

**Implémenter l'autocomplétion nutrition avec calcul automatique**

1. Utilisateur tape "pou"
2. Dropdown montre : "Poulet grillé", "Poulet rôti", "Poulet cru"
3. Clic sur "Poulet grillé"
4. Tous les champs se remplissent automatiquement :
   - Calories : 165
   - Protéines : 31g
   - Glucides : 0g
   - Lipides : 3.6g
   - Leucine : 2.5g
   - Isoleucine : 1.4g
   - Valine : 1.5g
5. Utilisateur peut ajuster portion
6. Enregistrement en 1 clic

**Temps estimé :** 30-45 minutes

---

## ✅ CHECKLIST DE REPRISE

- [ ] Lire ce document complet
- [ ] Vérifier que services tournent (`supervisorctl status`)
- [ ] Tester URL app : https://quick-preview-90.preview.emergentagent.com
- [ ] Tester endpoint search : `GET /api/nutrition/search?query=poulet`
- [ ] Ouvrir `/app/frontend/src/pages/NutritionPage.js`
- [ ] Commencer implémentation autocomplétion

---

**FIN DU HANDOFF**

Tout le contexte est préservé. Prêt à reprendre ! 🚀
