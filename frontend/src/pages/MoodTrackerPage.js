import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/utils/api';
import { Zap, Smile, Meh, Frown, ArrowLeft, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

export const MoodTrackerPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [notes, setNotes] = useState('');
  const [history, setHistory] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await api.getMoodHistory();
      setHistory(res.data);
    } catch (error) {
      console.error('Failed to load mood history');
    }
  };

  const handleSubmit = async () => {
    try {
      await api.createMoodEntry({
        mood_level: mood,
        energy_level: energy,
        notes: notes || null
      });
      toast.success('État enregistré !');
      setNotes('');
      loadHistory();
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const getAIInsights = async () => {
    if (!user?.is_premium) {
      toast.error('Fonctionnalité Premium uniquement');
      navigate('/premium');
      return;
    }

    setLoadingInsights(true);
    try {
      const context = `Historique mood/energy sur 7 jours. Données actuelles: Humeur=${mood}/5, Énergie=${energy}/5. 
      Dernières entrées: ${history.slice(0, 5).map(h => `Mood:${h.mood_level} Energy:${h.energy_level}`).join(', ')}`;
      
      const res = await api.getAIRecommendation({
        context: context,
        user_goal: 'Optimiser performance et bien-être basé sur humeur et énergie'
      });
      setInsights(res.data.recommendation);
      toast.success('Insights générés !');
    } catch (error) {
      toast.error('Erreur lors de la génération');
    } finally {
      setLoadingInsights(false);
    }
  };

  const getMoodEmoji = (level) => {
    if (level <= 2) return { icon: Frown, color: 'text-red-500', label: 'Faible' };
    if (level <= 3) return { icon: Meh, color: 'text-yellow-500', label: 'Moyen' };
    return { icon: Smile, color: 'text-green-500', label: 'Bon' };
  };

  const prepareChartData = () => {
    return history.slice(0, 14).reverse().map(entry => ({
      date: new Date(entry.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
      humeur: entry.mood_level,
      énergie: entry.energy_level
    }));
  };

  const moodIcon = getMoodEmoji(mood);
  const MoodIconComponent = moodIcon.icon;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border backdrop-blur-xl bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
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
              <Zap className="w-6 h-6 text-primary" />
              <span className="text-lg font-heading font-bold">MOOD & ENERGY</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-black tracking-tight mb-2">
            SUIVEZ VOTRE BIEN-ÊTRE
          </h1>
          <p className="text-muted-foreground">
            Corrélation entre humeur, énergie et performances
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card data-testid="mood-tracker-card" className="p-8 bg-card border-border">
            <h2 className="text-xl font-heading font-bold mb-6">AUJOURD'HUI</h2>
            
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-lg font-semibold">Humeur</Label>
                  <div className="flex items-center gap-2">
                    <MoodIconComponent className={`w-8 h-8 ${moodIcon.color}`} />
                    <span className="text-2xl font-heading font-bold text-primary">{mood}/5</span>
                  </div>
                </div>
                <Slider
                  data-testid="mood-slider"
                  value={[mood]}
                  onValueChange={(val) => setMood(val[0])}
                  min={1}
                  max={5}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Très bas</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-lg font-semibold">Énergie</Label>
                  <div className="flex items-center gap-2">
                    <Zap className="w-8 h-8 text-primary" />
                    <span className="text-2xl font-heading font-bold text-primary">{energy}/5</span>
                  </div>
                </div>
                <Slider
                  data-testid="energy-slider"
                  value={[energy]}
                  onValueChange={(val) => setEnergy(val[0])}
                  min={1}
                  max={5}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Épuisé</span>
                  <span>Plein d'énergie</span>
                </div>
              </div>

              <div>
                <Label>Notes (optionnel)</Label>
                <Textarea
                  data-testid="mood-notes-input"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Comment vous sentez-vous ? Qu'est-ce qui influence votre état ?"
                  rows={3}
                  className="mt-2"
                />
              </div>

              <Button
                data-testid="save-mood-btn"
                onClick={handleSubmit}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Enregistrer
              </Button>
            </div>
          </Card>

          <Card data-testid="mood-insights-card" className="p-8 bg-card border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold">INSIGHTS IA</h2>
              {user?.is_premium && (
                <Sparkles className="w-5 h-5 text-primary" />
              )}
            </div>

            {!user?.is_premium ? (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Débloquez les insights IA pour comprendre comment votre humeur et énergie impactent vos performances
                </p>
                <Button
                  data-testid="upgrade-premium-btn"
                  onClick={() => navigate('/premium')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Passer Premium
                </Button>
              </div>
            ) : insights ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-sm p-6 border border-primary/20">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{insights}</p>
                </div>
                <Button
                  data-testid="refresh-insights-btn"
                  onClick={getAIInsights}
                  disabled={loadingInsights}
                  variant="outline"
                  className="w-full"
                >
                  Actualiser les insights
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <Button
                  data-testid="generate-insights-btn"
                  onClick={getAIInsights}
                  disabled={loadingInsights || history.length === 0}
                  className="bg-primary hover:bg-primary/90"
                >
                  {loadingInsights ? 'Génération...' : 'Générer des insights'}
                </Button>
                {history.length === 0 && (
                  <p className="text-sm text-muted-foreground mt-4">
                    Enregistrez quelques entrées pour obtenir des insights
                  </p>
                )}
              </div>
            )}
          </Card>
        </div>

        {history.length > 0 && (
          <Card data-testid="mood-chart-card" className="p-8 bg-card border-border">
            <h2 className="text-xl font-heading font-bold mb-6">ÉVOLUTION (14 DERNIERS JOURS)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={prepareChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis domain={[0, 5]} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '2px'
                  }}
                />
                <Line type="monotone" dataKey="humeur" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                <Line type="monotone" dataKey="énergie" stroke="hsl(var(--chart-2))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>

            <div className="flex justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-chart-1 rounded-full" />
                <span className="text-sm text-muted-foreground">Humeur</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-chart-2 rounded-full" />
                <span className="text-sm text-muted-foreground">Énergie</span>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};
