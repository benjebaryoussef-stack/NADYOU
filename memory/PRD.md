# NADYOU Performance - Application de Suivi de Fitness

## Vue d'ensemble
Application web complète de suivi de fitness avec intelligence artificielle, permettant aux utilisateurs de suivre leurs entraînements de musculation, leur nutrition détaillée, leur progression et d'obtenir des recommandations personnalisées.

## Fonctionnalités Principales

### 1. Authentification & Gestion Utilisateur
- Inscription/Connexion avec JWT
- Gestion de profil utilisateur
- Système d'abonnement Premium (gratuit/premium)

### 2. Suivi d'Entraînement
- **Bibliothèque d'exercices prédéfinis** : 8 exercices de musculation (Développé Couché, Squat, Soulevé de Terre, Tractions, Développé Militaire, Curl Biceps, Extensions Triceps, Fentes)
- **Enregistrement de séances** : Séries, répétitions, poids
- **Chronomètre intégré** : Suivi du temps d'entraînement
- **Historique complet** : Consultation de toutes les séances
- **Statistiques** : Total d'entraînements, séries, exercice favori

### 3. Suivi Nutrition
- **Enregistrement de repas** avec :
  - Calories
  - Protéines
  - Glucides
  - Lipides
  - Acides aminés (Leucine, Isoleucine, Valine) - optionnel
- **Statistiques sur 7 jours** :
  - Total et moyenne de calories
  - Total macronutriments
  - Nombre de repas enregistrés

### 4. Progression & Graphiques
- **Graphiques d'entraînement** : Évolution sur 14 jours (séances, volume)
- **Graphiques nutrition** : Calories et protéines sur 14 jours
- **Vue d'ensemble** : Statistiques totales
- **Partage social** : Fonctionnalité de partage des performances

### 5. Coach IA Premium (GPT-5.2)
- **Recommandations personnalisées** basées sur :
  - Contexte utilisateur (niveau, fréquence, objectifs)
  - Historique d'entraînements
  - Données nutritionnelles
- **Accessible uniquement** aux membres Premium
- Utilise OpenAI GPT-5.2 via Clé Universelle Emergent

### 6. Système Premium
- **Plan Mensuel** : 9.99$/mois
- **Plan Annuel** : 99.99$/an (économie de 20%)
- **Paiement Stripe** sécurisé
- **Avantages Premium** :
  - Recommandations IA illimitées
  - Analyses avancées
  - Support prioritaire
  - Accès aux nouvelles fonctionnalités

## Architecture Technique

### Backend (FastAPI + MongoDB)
- **Framework** : FastAPI
- **Base de données** : MongoDB (Motor async driver)
- **Authentification** : JWT (python-jose, bcrypt)
- **Collections MongoDB** :
  - `users` : Données utilisateur et statut premium
  - `workout_logs` : Historique entraînements
  - `nutrition_logs` : Historique nutrition
  - `payment_transactions` : Transactions Stripe

### Frontend (React)
- **Framework** : React 19
- **Routing** : React Router v7
- **UI Components** : Shadcn/UI avec Radix UI
- **Styling** : Tailwind CSS
- **Graphiques** : Recharts
- **Notifications** : Sonner
- **Icônes** : Lucide React

### Intégrations
- **OpenAI GPT-5.2** : Recommandations IA (via Emergent Universal Key)
- **Stripe** : Paiements et abonnements (mode test avec `sk_test_emergent`)

## Design System

### Thème
- **Mode** : Dark (thème "Performance Pro")
- **Philosophie** : Tactical Minimalism, High contrast
- **Ton émotionnel** : Agressif, Discipliné, Élite

### Couleurs
- **Background** : #09090B (Deep Obsidian)
- **Foreground** : #FAFAFA (blanc cassé)
- **Primary** : #F97316 (Electric Blaze Orange)
- **Card** : #18181B
- **Border** : #27272A

### Typographie
- **Headings** : Barlow Condensed (700, 800, 900)
- **Body** : Manrope (400, 500, 600)
- **Mono** : JetBrains Mono (pour timers, data)

### Composants
- **Boutons** : Sharp edges, high contrast, hover effects
- **Cards** : Flat background, 1px border, no shadows
- **Inputs** : Rounded-sm, focus states avec border primary
- **Layout** : Bento Grid (high density)

## Endpoints API

### Auth
- `POST /api/auth/register` : Inscription
- `POST /api/auth/login` : Connexion
- `GET /api/auth/me` : Profil utilisateur

### Exercices
- `GET /api/exercises` : Liste exercices
- `GET /api/exercises/{id}` : Détail exercice

### Entraînements
- `POST /api/workouts` : Créer log
- `GET /api/workouts` : Historique
- `GET /api/workouts/stats` : Statistiques

### Nutrition
- `POST /api/nutrition` : Créer log
- `GET /api/nutrition` : Historique
- `GET /api/nutrition/stats?days=7` : Statistiques

### Progression
- `GET /api/progress/overview` : Vue d'ensemble

### IA
- `POST /api/ai/recommendations` : Générer recommandation (Premium only)

### Paiements
- `POST /api/payments/checkout` : Créer session Stripe
- `GET /api/payments/checkout/status/{session_id}` : Vérifier statut
- `POST /api/webhook/stripe` : Webhook Stripe

## Variables d'Environnement

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
CORS_ORIGINS=*
EMERGENT_LLM_KEY=sk-emergent-[key]
STRIPE_API_KEY=sk_test_emergent
JWT_SECRET_KEY=[secret]
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=[production_url]
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

## Pages & Routes

1. **/** : Landing page (accueil)
2. **/login** : Connexion
3. **/register** : Inscription
4. **/dashboard** : Dashboard principal
5. **/workouts** : Entraînements
6. **/nutrition** : Nutrition
7. **/progress** : Progression
8. **/ai** : Coach IA (Premium)
9. **/premium** : Abonnement
10. **/premium/success** : Confirmation paiement

## Statut Tests
- **Backend** : ✅ 100% (14/14 tests)
- **Frontend** : ✅ 95% (issues d'accessibilité mineurs corrigés)
- **Intégrations** : ✅ OpenAI GPT-5.2 et Stripe fonctionnels

## Prochaines Évolutions Possibles
1. Export de données (PDF, CSV)
2. Plans d'entraînement personnalisés
3. Intégration avec wearables (Apple Health, Google Fit)
4. Communauté et défis entre utilisateurs
5. Application mobile (React Native)
6. Mode hors-ligne avec synchronisation
7. Analyse vidéo de forme d'exercice
8. Recommandations de suppléments
