import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/utils/api';
import { Sparkles, ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export const AIPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [context, setContext] = useState('');
  const [userGoal, setUserGoal] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user?.is_premium) {
    navigate('/premium');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!context.trim()) {
      toast.error('Veuillez décrire votre situation');
      return;
    }

    setLoading(true);
    try {
      const res = await api.getAIRecommendation({ context, user_goal: userGoal });
      setRecommendation(res.data.recommendation);
      toast.success('Recommandation générée !');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Erreur lors de la génération');
    } finally {
      setLoading(false);
    }
  };

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
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-lg font-heading font-bold">IA COACH</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-black tracking-tight mb-2">COACH IA PREMIUM</h1>
          <p className="text-muted-foreground">Recommandations personnalisées par GPT-5.2</p>
        </div>

        <Card data-testid="ai-form" className="p-8 bg-card border-border mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Décrivez votre situation actuelle</label>
              <Textarea
                data-testid="context-input"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Ex: Je m'entraîne 4 fois par semaine, je veux progresser en développé couché mais je stagne à 80kg..."
                rows={5}
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Votre objectif (optionnel)</label>
              <Textarea
                data-testid="goal-input"
                value={userGoal}
                onChange={(e) => setUserGoal(e.target.value)}
                placeholder="Ex: Prendre 5kg de muscle, améliorer mon endurance, optimiser ma nutrition..."
                rows={3}
                className="w-full"
              />
            </div>

            <Button
              data-testid="generate-btn"
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? (
                <span>Génération en cours...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Générer une recommandation
                </>
              )}
            </Button>
          </form>
        </Card>

        {recommendation && (
          <Card data-testid="ai-recommendation" className="p-8 bg-gradient-to-br from-card to-secondary border-primary/50">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-heading font-bold">RECOMMANDATION PERSONNALISÉE</h2>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="whitespace-pre-wrap text-foreground leading-relaxed">{recommendation}</p>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};