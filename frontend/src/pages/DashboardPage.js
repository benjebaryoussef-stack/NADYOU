import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';
import { Dumbbell, Apple, TrendingUp, Sparkles, Crown, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export const DashboardPage = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [workoutStats, setWorkoutStats] = useState(null);
  const [nutritionStats, setNutritionStats] = useState(null);

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    try {
      const [workoutRes, nutritionRes, progressRes] = await Promise.all([
        api.getWorkoutStats().catch(() => ({ data: null })),
        api.getNutritionStats().catch(() => ({ data: null })),
        api.getProgressOverview().catch(() => ({ data: null }))
      ]);
      setWorkoutStats(workoutRes.data);
      setNutritionStats(nutritionRes.data);
      setStats(progressRes.data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('À bientôt !');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Dumbbell className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border backdrop-blur-xl bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-8 h-8 text-primary" />
              <span className="text-xl font-heading font-bold tracking-tight">PERFORMANCE PRO</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="hidden sm:inline">{user.name}</span>
                {user.is_premium && <Crown className="w-4 h-4 text-primary" />}
              </div>
              <Button
                data-testid="logout-btn"
                variant="ghost"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-black tracking-tight mb-2">
            BONJOUR, {user.name.toUpperCase()}
          </h1>
          <p className="text-muted-foreground">Votre évolution commence ici</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card 
            data-testid="nav-card-workouts"
            className="p-6 bg-card border-border hover:border-primary/50 cursor-pointer transition-colors duration-300"
            onClick={() => navigate('/workouts')}
          >
            <Dumbbell className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-heading font-bold mb-1">Entraînements</h3>
            <p className="text-2xl font-heading font-black text-primary">
              {workoutStats?.total_workouts || 0}
            </p>
            <p className="text-sm text-muted-foreground mt-1">séances</p>
          </Card>

          <Card 
            data-testid="nav-card-nutrition"
            className="p-6 bg-card border-border hover:border-primary/50 cursor-pointer transition-colors duration-300"
            onClick={() => navigate('/nutrition')}
          >
            <Apple className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-heading font-bold mb-1">Nutrition</h3>
            <p className="text-2xl font-heading font-black text-primary">
              {nutritionStats?.meal_count || 0}
            </p>
            <p className="text-sm text-muted-foreground mt-1">repas</p>
          </Card>

          <Card 
            data-testid="nav-card-progress"
            className="p-6 bg-card border-border hover:border-primary/50 cursor-pointer transition-colors duration-300"
            onClick={() => navigate('/progress')}
          >
            <TrendingUp className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-heading font-bold mb-1">Progression</h3>
            <p className="text-2xl font-heading font-black text-primary">
              {workoutStats?.total_sets || 0}
            </p>
            <p className="text-sm text-muted-foreground mt-1">séries total</p>
          </Card>

          <Card 
            data-testid="nav-card-ai"
            className="p-6 bg-card border-border hover:border-primary/50 cursor-pointer transition-colors duration-300"
            onClick={() => navigate(user.is_premium ? '/ai' : '/premium')}
          >
            <Sparkles className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-heading font-bold mb-1">IA Coach</h3>
            <p className="text-sm text-primary mt-2">
              {user.is_premium ? 'Actif' : 'Premium uniquement'}
            </p>
          </Card>
        </div>

        {!user.is_premium && (
          <Card data-testid="premium-upsell" className="p-8 bg-gradient-to-r from-card to-secondary border-primary/50 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-heading font-black">PASSEZ PREMIUM</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Débloquez les recommandations IA personnalisées par GPT-5.2 et les analyses avancées.
                </p>
                <Button
                  data-testid="premium-upgrade-btn"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => navigate('/premium')}
                >
                  Découvrir Premium
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <Card data-testid="quick-stats" className="p-6 bg-card border-border">
            <h3 className="text-xl font-heading font-bold mb-4">STATISTIQUES RAPIDES</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-muted-foreground">Exercice favori</span>
                <span className="font-heading font-bold">{workoutStats?.favorite_exercise || 'Aucun'}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-muted-foreground">Calories/jour (7j)</span>
                <span className="font-heading font-bold">{Math.round(nutritionStats?.avg_daily_calories || 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Protéines totales (7j)</span>
                <span className="font-heading font-bold">{Math.round(nutritionStats?.total_proteins || 0)}g</span>
              </div>
            </div>
          </Card>

          <Card data-testid="quick-actions" className="p-6 bg-card border-border">
            <h3 className="text-xl font-heading font-bold mb-4">ACTIONS RAPIDES</h3>
            <div className="space-y-3">
              <Button
                data-testid="quick-action-workout"
                className="w-full justify-start bg-secondary hover:bg-secondary/80"
                onClick={() => navigate('/workouts')}
              >
                <Dumbbell className="w-5 h-5 mr-2" />
                Enregistrer un entraînement
              </Button>
              <Button
                data-testid="quick-action-nutrition"
                className="w-full justify-start bg-secondary hover:bg-secondary/80"
                onClick={() => navigate('/nutrition')}
              >
                <Apple className="w-5 h-5 mr-2" />
                Ajouter un repas
              </Button>
              <Button
                data-testid="quick-action-progress"
                className="w-full justify-start bg-secondary hover:bg-secondary/80"
                onClick={() => navigate('/progress')}
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Voir ma progression
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};