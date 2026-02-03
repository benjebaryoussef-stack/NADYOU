import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Activity, Moon, Heart, TrendingUp, Shield, Zap, ArrowLeft } from 'lucide-react';

export const AIExplanationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-white/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Button
              data-testid="back-btn"
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Retour
            </Button>
            <span className="text-lg font-medium">NADYOU</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Brain className="w-8 h-8 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-light text-foreground mb-4 tracking-tight">
            Une IA pensée pour la performance durable
          </h1>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Chez NADYOU, l'intelligence artificielle ne remplace pas l'écoute du corps.
            <br />
            Elle l'amplifie.
          </p>
        </div>

        <Card className="p-10 bg-white border border-border mb-12 slide-up">
          <h2 className="text-2xl font-light text-foreground mb-8">
            Notre IA analyse les interactions entre
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Activité physique</h3>
                <p className="text-sm text-muted-foreground font-light">Type, intensité et fréquence d'entraînement</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Récupération</h3>
                <p className="text-sm text-muted-foreground font-light">Qualité et durée de la régénération</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Moon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Sommeil</h3>
                <p className="text-sm text-muted-foreground font-light">Quantité et impact sur les performances</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Nutrition</h3>
                <p className="text-sm text-muted-foreground font-light">Apports et timing des macronutriments</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-medium mb-1">État émotionnel</h3>
                <p className="text-sm text-muted-foreground font-light">Humeur, stress et motivation</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-secondary/30 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Ces dimensions sont scientifiquement reconnues comme interconnectées dans la performance sportive durable.
            </p>
          </div>
        </Card>

        <Card className="p-10 bg-white border border-border mb-12">
          <h2 className="text-2xl font-light text-foreground mb-8">
            Ce que fait concrètement notre IA
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 pb-6 border-b border-border">
              <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="font-medium mb-2">Analyse les tendances sur 7 et 30 jours</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  Détecte les patterns récurrents et les évolutions de votre état physique et mental.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-6 border-b border-border">
              <Brain className="w-6 h-6 text-primary flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="font-medium mb-2">Identifie les facteurs influents</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  Comprend ce qui affecte positivement ou négativement votre humeur et votre énergie.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-6 border-b border-border">
              <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="font-medium mb-2">Ajuste les recommandations d'entraînement</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  Propose une intensité adaptée selon votre état du moment (sommeil, stress, énergie).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="font-medium mb-2">Propose des alternatives de récupération</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  Suggère mobilité, yoga ou repos actif quand le corps en a besoin.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-10 bg-white border border-border mb-12">
          <h2 className="text-2xl font-light text-foreground mb-8">
            Ce que notre IA ne fait pas
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" strokeWidth={1.5} />
              <p className="text-muted-foreground font-light">Aucun diagnostic médical</p>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" strokeWidth={1.5} />
              <p className="text-muted-foreground font-light">Aucune injonction ou obligation</p>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" strokeWidth={1.5} />
              <p className="text-muted-foreground font-light">Aucune pression artificielle</p>
            </div>
          </div>
        </Card>

        <Card className="p-10 bg-gradient-to-br from-primary/5 to-white border border-primary/20">
          <h2 className="text-2xl font-light text-foreground mb-4">
            Pourquoi c'est différent
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed mb-6">
            La performance ne se résume pas à s'entraîner plus.
            Elle repose sur la cohérence entre corps, mental et récupération.
          </p>
          <p className="text-foreground font-medium mb-8">
            NADYOU agit comme un co-pilote, pas comme un motivateur aveugle.
          </p>
          <div className="text-center py-8 border-t border-primary/20">
            <p className="text-xl font-light text-primary italic">
              "Écouter son corps n'est pas un frein. C'est une stratégie."
            </p>
          </div>
        </Card>

        <div className="text-center mt-12">
          <Button
            onClick={() => navigate('/dashboard')}
            className="bg-primary hover:bg-primary/90"
          >
            Retour au dashboard
          </Button>
        </div>
      </main>
    </div>
  );
};
