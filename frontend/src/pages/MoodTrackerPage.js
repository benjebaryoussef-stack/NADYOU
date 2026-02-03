import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/utils/api';
import { Zap, Smile, Meh, Frown, ArrowLeft, TrendingUp, Sparkles, Moon, AlertCircle, Utensils, Heart, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { toast } from 'sonner';

const MOOD_FACTORS = [
  { id: 'fatigue', label: 'Fatigue', icon: Moon, color: 'text-blue-400' },
  { id: 'stress', label: 'Stress', icon: AlertCircle, color: 'text-red-400' },
  { id: 'nutrition', label: 'Alimentation', icon: Utensils, color: 'text-green-400' },
  { id: 'emotional', label: 'Émotionnel', icon: Heart, color: 'text-pink-400' },
  { id: 'motivation', label: 'Motivation', icon: Target, color: 'text-purple-400' },
];

export const MoodTrackerPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [notes, setNotes] = useState('');
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [history, setHistory] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    loadHistory();
    loadInsights();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await api.getMoodHistory();
      setHistory(res.data);
    } catch (error) {
      console.error('Failed to load mood history');
    }
  };

  const loadInsights = async () => {
    try {
      const res = await api.getMoodInsights();
      setInsights(res.data);
    } catch (error) {
      console.error('Failed to load insights');
    }
  };

  const toggleFactor = (factorId) => {
    setSelectedFactors(prev => 
      prev.includes(factorId) 
        ? prev.filter(f => f !== factorId)
        : [...prev, factorId]
    );
  };

  const handleSubmit = async () => {
    try {
      await api.createMoodEntry({
        mood_level: mood,
        energy_level: energy,
        notes: notes || null,
        factors: selectedFactors
      });
      toast.success('État enregistré !');
      setNotes('');
      setSelectedFactors([]);
      loadHistory();
      loadInsights();
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
      const factorText = selectedFactors.map(f => MOOD_FACTORS.find(mf => mf.id === f)?.label).join(', ');
      const context = `Analyse psycho-sportive sur 30 jours. 
      État actuel: Humeur=${mood}/5, Énergie=${energy}/5, Facteurs=${factorText || 'Aucun'}.
      Statistiques: Humeur moyenne 7j=${insights?.avg_mood_7d}, 30j=${insights?.avg_mood_30d}.
      Impact sport: ${insights?.workout_mood_impact > 0 ? '+' : ''}${insights?.workout_mood_impact} points.
      Jours entraînement: ${insights?.workout_days}, Jours repos: ${insights?.rest_days}.
      Facteur dominant: ${insights?.most_common_factor || 'Aucun'}.`;
      
      const res = await api.getAIRecommendation({
        context: context,
        user_goal: 'Optimiser bien-être et performances en analysant les corrélations humeur/sport/nutrition'
      });
      
      toast.success('Analyse IA générée !');
      return res.data.recommendation;
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

  const prepareFactorData = () => {
    if (!insights?.factor_counts) return [];
    return Object.entries(insights.factor_counts).map(([factor, count]) => ({
      name: MOOD_FACTORS.find(f => f.id === factor)?.label || factor,
      count: count
    }));
  };

  const getSmartMessage = () => {
    if (!insights) return null;
    
    const messages = [];
    
    if (insights.workout_mood_impact > 0.5) {
      messages.push({
        type: 'positive',
        text: `💪 Quand tu t'entraînes, ton humeur augmente de +${insights.workout_mood_impact.toFixed(1)} en moyenne !`,
        icon: '🎯'
      });
    }
    
    if (insights.mood_trend === 'hausse') {
      messages.push({
        type: 'positive',
        text: `📈 Ton humeur est en progression ! Continue comme ça.`,
        icon: '⬆️'
      });
    } else if (insights.mood_trend === 'baisse') {
      messages.push({
        type: 'warning',
        text: `📉 Ton humeur baisse ces derniers jours. Prends soin de toi.`,
        icon: '⚠️'
      });
    }
    
    if (insights.most_common_factor) {
      const factor = MOOD_FACTORS.find(f => f.id === insights.most_common_factor);
      messages.push({
        type: 'info',
        text: `${factor?.label || insights.most_common_factor} affecte le plus souvent ton humeur.`,
        icon: '💡'
      });
    }
    
    if (insights.workout_days >= 3 && insights.avg_mood_7d > 3.5) {
      messages.push({
        type: 'positive',
        text: `🔥 ${insights.workout_days} entraînements cette semaine ! Ton humeur en bénéficie (${insights.avg_mood_7d.toFixed(1)}/5).`,
        icon: '💪'
      });
    }
    
    return messages;
  };

  const moodIcon = getMoodEmoji(mood);
  const MoodIconComponent = moodIcon.icon;
  const smartMessages = getSmartMessage();

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
              <span className="text-lg font-heading font-bold">BIEN-ÊTRE & PERFORMANCE</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-black tracking-tight mb-2">
            INTELLIGENCE ÉMOTIONNELLE
          </h1>
          <p className="text-muted-foreground">
            Comprenez le lien entre votre état mental et vos performances
          </p>
        </div>

        {smartMessages && smartMessages.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {smartMessages.map((msg, idx) => (
              <Card 
                key={idx}
                data-testid={`smart-message-${idx}`}
                className={`p-4 border-l-4 ${
                  msg.type === 'positive' ? 'border-l-green-500 bg-green-500/10' :
                  msg.type === 'warning' ? 'border-l-yellow-500 bg-yellow-500/10' :
                  'border-l-blue-500 bg-blue-500/10'
                }`}
              >
                <p className="text-sm font-medium">
                  <span className="text-xl mr-2">{msg.icon}</span>
                  {msg.text}
                </p>
              </Card>
            ))}
          </div>
        )}

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
                <Label className="text-lg font-semibold mb-3 block">Facteurs influençant (1 clic)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {MOOD_FACTORS.map(factor => {
                    const Icon = factor.icon;
                    const isSelected = selectedFactors.includes(factor.id);
                    return (
                      <button
                        key={factor.id}
                        data-testid={`factor-${factor.id}`}
                        onClick={() => toggleFactor(factor.id)}
                        className={`p-4 rounded-sm border-2 transition-all ${
                          isSelected 
                            ? 'border-primary bg-primary/20 scale-105' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-primary' : factor.color}`} />
                        <p className="text-sm font-semibold text-center">{factor.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label>Notes (optionnel)</Label>
                <Textarea
                  data-testid="mood-notes-input"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Comment vous sentez-vous ?"
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

          <div className="space-y-6">
            {insights && (
              <Card data-testid="insights-summary" className="p-6 bg-card border-border">
                <h2 className="text-xl font-heading font-bold mb-4">VUE D'ENSEMBLE</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-secondary rounded-sm">
                    <p className="text-3xl font-heading font-black text-primary">{insights.avg_mood_7d?.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">Humeur (7j)</p>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-sm">
                    <p className="text-3xl font-heading font-black text-primary">{insights.avg_energy_7d?.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">Énergie (7j)</p>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-sm">
                    <p className="text-3xl font-heading font-black text-primary">{insights.workout_days}</p>
                    <p className="text-sm text-muted-foreground">Jours sport</p>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-sm">
                    <p className={`text-3xl font-heading font-black ${insights.workout_mood_impact > 0 ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {insights.workout_mood_impact > 0 ? '+' : ''}{insights.workout_mood_impact?.toFixed(1)}
                    </p>
                    <p className="text-sm text-muted-foreground">Impact sport</p>
                  </div>
                </div>
              </Card>
            )}

            <Card data-testid="ai-insights-card" className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-bold">ANALYSE IA</h2>
                {user?.is_premium && <Sparkles className="w-5 h-5 text-primary" />}
              </div>

              {!user?.is_premium ? (
                <div className="text-center py-8">
                  <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4 text-sm">
                    Débloquez l'analyse psycho-sportive complète avec corrélations avancées
                  </p>
                  <Button
                    data-testid="upgrade-premium-btn"
                    onClick={() => navigate('/premium')}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Passer Premium
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Button
                    data-testid="generate-ai-insights-btn"
                    onClick={getAIInsights}
                    disabled={loadingInsights || history.length === 0}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {loadingInsights ? 'Analyse en cours...' : 'Générer une analyse approfondie'}
                  </Button>
                  {history.length === 0 && (
                    <p className="text-sm text-muted-foreground mt-4">
                      Enregistrez quelques entrées pour une analyse complète
                    </p>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>

        {history.length > 0 && (
          <>
            <Card data-testid="mood-evolution-chart" className="p-8 bg-card border-border mb-6">
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
                  <Line type="monotone" dataKey="humeur" stroke="hsl(var(--chart-1))" strokeWidth={3} />
                  <Line type="monotone" dataKey="énergie" stroke="hsl(var(--chart-2))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {prepareFactorData().length > 0 && (
              <Card data-testid="factors-chart" className="p-8 bg-card border-border">
                <h2 className="text-xl font-heading font-bold mb-6">FACTEURS DOMINANTS</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={prepareFactorData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '2px'
                      }}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  );
};
