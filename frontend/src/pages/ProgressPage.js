import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';
import { TrendingUp, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

export const ProgressPage = () => {
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await api.getProgressOverview();
      setProgressData(res.data);
    } catch (error) {
      toast.error('Erreur lors du chargement');
    }
  };

  const handleShare = () => {
    toast.success('Fonctionnalité de partage à venir !');
  };

  const prepareWorkoutChartData = () => {
    if (!progressData?.workout_progression) return [];
    return Object.entries(progressData.workout_progression)
      .slice(-14)
      .map(([date, data]) => ({
        date: new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
        séances: data.count,
        volume: Math.round(data.total_weight / 1000)
      }));
  };

  const prepareNutritionChartData = () => {
    if (!progressData?.nutrition_progression) return [];
    return Object.entries(progressData.nutrition_progression)
      .slice(-14)
      .map(([date, data]) => ({
        date: new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
        calories: Math.round(data.calories),
        protéines: Math.round(data.proteins)
      }));
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border backdrop-blur-xl bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                data-testid="back-to-dashboard-btn"
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span className="text-lg font-heading font-bold">PROGRESSION</span>
              </div>
            </div>
            <Button
              data-testid="share-progress-btn"
              variant="outline"
              size="sm"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-heading font-black tracking-tight mb-8">MA PROGRESSION</h1>

        {progressData && (
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card data-testid="total-workouts-card" className="p-6 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-1">Total Entraînements</p>
              <p className="text-4xl font-heading font-black text-primary">
                {progressData.total_workouts}
              </p>
            </Card>
            <Card data-testid="total-meals-card" className="p-6 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-1">Total Repas Suivis</p>
              <p className="text-4xl font-heading font-black text-primary">
                {progressData.total_meals_logged}
              </p>
            </Card>
          </div>
        )}

        <div className="space-y-6">
          <Card data-testid="workout-chart" className="p-6 bg-card border-border">
            <h2 className="text-xl font-heading font-bold mb-6">ENTRAÎNEMENTS (14 DERNIERS JOURS)</h2>
            {prepareWorkoutChartData().length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={prepareWorkoutChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '2px'
                    }}
                  />
                  <Bar dataKey="séances" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-center py-12">Aucune donnée disponible</p>
            )}
          </Card>

          <Card data-testid="nutrition-chart" className="p-6 bg-card border-border">
            <h2 className="text-xl font-heading font-bold mb-6">NUTRITION (14 DERNIERS JOURS)</h2>
            {prepareNutritionChartData().length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={prepareNutritionChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '2px'
                    }}
                  />
                  <Line type="monotone" dataKey="calories" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                  <Line type="monotone" dataKey="protéines" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-center py-12">Aucune donnée disponible</p>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};