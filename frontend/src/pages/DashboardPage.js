import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Apple, TrendingUp, Sparkles, User, LogOut, Heart, Target, Zap, ArrowRight, Flame, Trophy } from 'lucide-react';
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
  const [goals] = useState(() => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center">
        <div className="text-center">
          <Dumbbell className="w-12 h-12 text-white animate-pulse mx-auto mb-4" />
          <p className="text-white/80 font-light">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec gradient coloré */}
      <nav className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">NADYOU</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <span className="hidden sm:inline font-medium text-white">{currentUser.name}</span>
                {currentUser.is_premium && (
                  <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs rounded-full font-bold">PRO</span>
                )}
              </div>
              <Button
                data-testid="logout-btn"
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                <LogOut className="w-5 h-5" strokeWidth={2} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 pb-32 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Bonjour, {currentUser.name} 👋
              </h1>
              <p className="text-lg text-purple-200 font-light italic">
                "{inspirationalPhrase}"
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate('/workouts')}
                className="bg-white text-purple-700 hover:bg-purple-50 font-semibold shadow-lg"
              >
                <Zap className="w-4 h-4 mr-2" />
                Nouvel entraînement
              </Button>
              <Button
                onClick={() => navigate('/nutrition')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold"
              >
                <Apple className="w-4 h-4 mr-2" />
                Ajouter un repas
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        {/* Objectifs du jour avec barres de progression */}
        <Card className="p-6 bg-white border-0 shadow-xl rounded-2xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Objectifs du jour</h2>
                <p className="text-sm text-gray-500">Reste focus sur tes macros</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 font-semibold"
              onClick={() => navigate('/nutrition')}
            >
              Voir détails <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Calories */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Calories</span>
                <span className="font-bold text-orange-600">{Math.round(nutritionStats.today_calories)} / {goals.calories}</span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-500 rounded-full"
                  style={{ width: `${getProgressPercent(nutritionStats.today_calories, goals.calories)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {Math.max(0, Math.round(goals.calories - nutritionStats.today_calories))} restantes
              </p>
            </div>

            {/* Protéines */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Protéines</span>
                <span className="font-bold text-blue-600">{Math.round(nutritionStats.today_proteins)}g / {goals.proteins}g</span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-500 rounded-full"
                  style={{ width: `${getProgressPercent(nutritionStats.today_proteins, goals.proteins)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {Math.max(0, Math.round(goals.proteins - nutritionStats.today_proteins))}g restants
              </p>
            </div>

            {/* Glucides */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Glucides</span>
                <span className="font-bold text-green-600">{Math.round(nutritionStats.today_carbs)}g / {goals.carbs}g</span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500 rounded-full"
                  style={{ width: `${getProgressPercent(nutritionStats.today_carbs, goals.carbs)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {Math.max(0, Math.round(goals.carbs - nutritionStats.today_carbs))}g restants
              </p>
            </div>

            {/* Lipides */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Lipides</span>
                <span className="font-bold text-purple-600">{Math.round(nutritionStats.today_fats)}g / {goals.fats}g</span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-500 rounded-full"
                  style={{ width: `${getProgressPercent(nutritionStats.today_fats, goals.fats)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {Math.max(0, Math.round(goals.fats - nutritionStats.today_fats))}g restants
              </p>
            </div>
          </div>
        </Card>

        {/* Cartes de navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card 
            data-testid="nav-card-workouts"
            className="p-6 bg-gradient-to-br from-purple-500 to-indigo-600 border-0 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 rounded-2xl group"
            onClick={() => navigate('/workouts')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <span className="text-4xl font-bold text-white">{workoutStats.total_workouts}</span>
            </div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide">Entraînements</h3>
            <p className="text-xs text-white/60 mt-1">7 derniers jours</p>
            <div className="mt-4 flex items-center text-white/80 text-sm font-medium group-hover:text-white">
              Commencer <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>

          <Card 
            data-testid="nav-card-nutrition"
            className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 border-0 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 rounded-2xl group"
            onClick={() => navigate('/nutrition')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Apple className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <span className="text-4xl font-bold text-white">{nutritionStats.meal_count}</span>
            </div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide">Repas suivis</h3>
            <p className="text-xs text-white/60 mt-1">Total enregistré</p>
            <div className="mt-4 flex items-center text-white/80 text-sm font-medium group-hover:text-white">
              Ajouter <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>

          <Card 
            data-testid="nav-card-mood"
            className="p-6 bg-gradient-to-br from-pink-500 to-rose-600 border-0 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 rounded-2xl group"
            onClick={() => navigate('/mood-tracker')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <Sparkles className="w-8 h-8 text-white/60" strokeWidth={2} />
            </div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide">Bien-être</h3>
            <p className="text-xs text-white/60 mt-1">Suivi quotidien</p>
            <div className="mt-4 flex items-center text-white/80 text-sm font-medium group-hover:text-white">
              Logger <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>

          <Card 
            data-testid="nav-card-progress"
            className="p-6 bg-gradient-to-br from-orange-500 to-amber-600 border-0 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 rounded-2xl group"
            onClick={() => navigate('/progress')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <span className="text-4xl font-bold text-white">{workoutStats.total_sets}</span>
            </div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide">Séries totales</h3>
            <p className="text-xs text-white/60 mt-1">Performance</p>
            <div className="mt-4 flex items-center text-white/80 text-sm font-medium group-hover:text-white">
              Analyser <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </div>

        {/* Section Premium CTA */}
        {!currentUser.is_premium && (
          <Card data-testid="premium-upsell" className="p-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 border-0 shadow-xl rounded-2xl mb-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-white/20 text-white text-sm font-bold rounded-full">OFFRE LIMITÉE</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Passe au niveau supérieur 🚀</h3>
                <p className="text-white/90 font-medium max-w-xl">
                  Débloquez l'analyse IA, les recommandations personnalisées et les insights avancés pour exploser tes performances.
                </p>
              </div>
              <Button
                data-testid="premium-upgrade-btn"
                className="bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg px-8 py-6 shadow-lg"
                onClick={() => navigate('/premium')}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Devenir Premium
              </Button>
            </div>
          </Card>
        )}

        {/* Stats et Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card data-testid="quick-stats" className="p-6 bg-white border-0 shadow-lg rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Vue d'ensemble</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Exercice favori</span>
                <span className="font-bold text-gray-900">{workoutStats.favorite_exercise}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Calories moy./jour</span>
                <span className="font-bold text-gray-900">{Math.round(nutritionStats.avg_daily_calories)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Protéines (7j)</span>
                <span className="font-bold text-gray-900">{Math.round(nutritionStats.total_proteins)}g</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Répétitions totales</span>
                <span className="font-bold text-gray-900">{workoutStats.total_reps}</span>
              </div>
            </div>
          </Card>

          <Card data-testid="quick-actions" className="p-6 bg-white border-0 shadow-lg rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Actions rapides</h3>
            </div>
            <div className="space-y-3">
              <Button
                data-testid="quick-action-workout"
                className="w-full justify-between bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl"
                onClick={() => navigate('/workouts')}
              >
                <div className="flex items-center">
                  <Dumbbell className="w-5 h-5 mr-3" />
                  Enregistrer un entraînement
                </div>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                data-testid="quick-action-nutrition"
                className="w-full justify-between bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl"
                onClick={() => navigate('/nutrition')}
              >
                <div className="flex items-center">
                  <Apple className="w-5 h-5 mr-3" />
                  Ajouter un repas
                </div>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                data-testid="quick-action-mood"
                className="w-full justify-between bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold py-4 rounded-xl"
                onClick={() => navigate('/mood-tracker')}
              >
                <div className="flex items-center">
                  <Heart className="w-5 h-5 mr-3" />
                  Logger mon humeur
                </div>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">NADYOU</span>
            </div>
            <p className="text-gray-400 text-sm">Performance physique et équilibre émotionnel</p>
            <div className="flex gap-4">
              <Button variant="ghost" className="text-gray-400 hover:text-white" onClick={() => navigate('/premium')}>
                Premium
              </Button>
              <Button variant="ghost" className="text-gray-400 hover:text-white" onClick={() => navigate('/progress')}>
                Progression
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
