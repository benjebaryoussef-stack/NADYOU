import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/utils/api';
import { Crown, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export const PremiumPage = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      checkPaymentStatus(sessionId);
    }
  }, [sessionId]);

  const checkPaymentStatus = async (sessionId, attempt = 0) => {
    if (attempt >= 5) {
      toast.error('Vérification du paiement expirée');
      return;
    }

    setCheckingPayment(true);
    try {
      const res = await api.getCheckoutStatus(sessionId);
      if (res.data.payment_status === 'paid') {
        await refreshUser();
        toast.success('Paiement réussi ! Bienvenue Premium 🎉');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else if (res.data.status === 'expired') {
        toast.error('Session de paiement expirée');
      } else {
        setTimeout(() => checkPaymentStatus(sessionId, attempt + 1), 2000);
      }
    } catch (error) {
      toast.error('Erreur lors de la vérification');
    } finally {
      setCheckingPayment(false);
    }
  };

  const handleSubscribe = async (packageId) => {
    setLoading(true);
    try {
      const originUrl = window.location.origin;
      const res = await api.createCheckout({ package_id: packageId, origin_url: originUrl });
      window.location.href = res.data.url;
    } catch (error) {
      toast.error('Erreur lors de la création du paiement');
      setLoading(false);
    }
  };

  if (user?.is_premium && !sessionId) {
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
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Crown className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-heading font-black mb-4">VOUS ÊTES DÉJÀ PREMIUM !</h1>
          <p className="text-muted-foreground mb-8">Profitez de toutes les fonctionnalités exclusives.</p>
          <Button
            data-testid="go-to-ai-btn"
            onClick={() => navigate('/ai')}
            className="bg-primary hover:bg-primary/90"
          >
            Accéder au Coach IA
          </Button>
        </main>
      </div>
    );
  }

  if (checkingPayment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Vérification du paiement...</p>
        </div>
      </div>
    );
  }

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
              <Crown className="w-6 h-6 text-primary" />
              <span className="text-lg font-heading font-bold">PREMIUM</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-heading font-black tracking-tight mb-4">
            PASSEZ AU NIVEAU
            <span className="text-primary block mt-2">PREMIUM</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Débloquez tout le potentiel de Performance Pro
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card data-testid="monthly-plan" className="p-8 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-heading font-bold mb-2">MENSUEL</h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-heading font-black text-primary">9.99</span>
                <span className="text-muted-foreground">$/mois</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>Recommandations IA illimitées</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>Analyses avancées</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>Support prioritaire</span>
              </li>
            </ul>
            <Button
              data-testid="subscribe-monthly-btn"
              onClick={() => handleSubscribe('monthly')}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {loading ? 'Chargement...' : 'S\'abonner'}
            </Button>
          </Card>

          <Card data-testid="yearly-plan" className="p-8 bg-gradient-to-br from-card to-secondary border-primary relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-sm text-xs font-bold">
              MEILLEURE OFFRE
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-heading font-bold mb-2">ANNUEL</h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-heading font-black text-primary">99.99</span>
                <span className="text-muted-foreground">/an</span>
              </div>
              <p className="text-sm text-primary mt-2">Soit 8.33$/mois - Économisez 20%</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>Tous les avantages mensuels</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>Économies de 20%</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>Accès aux nouvelles fonctions</span>
              </li>
            </ul>
            <Button
              data-testid="subscribe-yearly-btn"
              onClick={() => handleSubscribe('yearly')}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {loading ? 'Chargement...' : 'S\'abonner'}
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};