import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, TrendingUp, Zap, Crown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border backdrop-blur-xl bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-8 h-8 text-primary" />
              <span className="text-xl font-heading font-bold tracking-tight">NADYOU PERFORMANCE</span>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <Button 
                data-testid="nav-login-btn"
                variant="ghost" 
                onClick={() => navigate('/login')}
              >
                Connexion
              </Button>
              <Button 
                data-testid="nav-register-btn"
                onClick={() => navigate('/register')}
                className="bg-primary hover:bg-primary/90"
              >
                Commencer
              </Button>
            </div>

            <button
              data-testid="mobile-menu-btn"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card p-4 space-y-2">
            <Button 
              data-testid="mobile-login-btn"
              variant="ghost" 
              className="w-full"
              onClick={() => navigate('/login')}
            >
              Connexion
            </Button>
            <Button 
              data-testid="mobile-register-btn"
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => navigate('/register')}
            >
              Commencer
            </Button>
          </div>
        )}
      </nav>

      <main>
        <section className="relative min-h-[600px] flex items-center overflow-hidden">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `linear-gradient(rgba(9, 9, 11, 0.85), rgba(9, 9, 11, 0.85)), url('https://images.unsplash.com/photo-1754475118668-64ac3f3b2559?crop=entropy&cs=srgb&fm=jpg&q=85')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-3xl">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tight text-foreground mb-6">
                DÉPASSEZ VOS
                <span className="text-primary block">LIMITES</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
                Suivez vos entraînements, optimisez votre nutrition et obtenez des recommandations IA personnalisées pour atteindre vos objectifs fitness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  data-testid="hero-start-btn"
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-lg font-heading font-bold"
                  onClick={() => navigate('/register')}
                >
                  Commencer Gratuitement
                </Button>
                <Button 
                  data-testid="hero-premium-btn"
                  size="lg" 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 text-lg font-heading font-bold"
                  onClick={() => navigate('/register')}
                >
                  Découvrir Premium
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-heading font-black tracking-tight text-center mb-16">
              FONCTIONNALITÉS ÉLITE
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div data-testid="feature-workouts" className="bg-background border border-border rounded-sm p-8 card-hover">
                <Dumbbell className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-3">Suivi Entraînement</h3>
                <p className="text-muted-foreground">
                  Bibliothèque d'exercices complète avec suivi détaillé : séries, répétitions, poids et chronomètre intégré.
                </p>
              </div>
              
              <div data-testid="feature-nutrition" className="bg-background border border-border rounded-sm p-8 card-hover">
                <TrendingUp className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-3">Nutrition Complète</h3>
                <p className="text-muted-foreground">
                  Suivez calories, protéines, glucides, lipides et acides aminés avec graphiques de progression.
                </p>
              </div>
              
              <div data-testid="feature-ai" className="bg-background border border-border rounded-sm p-8 card-hover">
                <Zap className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-3">IA Premium</h3>
                <p className="text-muted-foreground">
                  Recommandations personnalisées par GPT-5.2 pour optimiser vos performances et atteindre vos objectifs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Crown className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-heading font-black tracking-tight mb-6">
              PASSEZ AU NIVEAU PREMIUM
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Débloquez les recommandations IA, analyses avancées et fonctionnalités exclusives.
            </p>
            <Button 
              data-testid="cta-premium-btn"
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-lg font-heading font-bold"
              onClick={() => navigate('/register')}
            >
              Découvrir Premium
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>© 2026 NADYOU Performance. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};