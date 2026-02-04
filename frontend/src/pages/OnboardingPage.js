import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, User, Heart, Target, Calendar, Moon, Wind, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    sex: '',
    age: '',
    height: '',
    weight: '',
    goal: '',
    sport_relation: '',
    frequency: '',
    sleep_hours: '',
    stress_level: ''
  });

  const GOALS = [
    { id: 'performance', label: 'Performance', icon: TrendingUp, color: 'from-blue-50 to-blue-100', iconColor: 'text-blue-600' },
    { id: 'aesthetic', label: 'Esthétique', icon: Target, color: 'from-purple-50 to-purple-100', iconColor: 'text-purple-600' },
    { id: 'balance', label: 'Équilibre & santé', icon: Heart, color: 'from-green-50 to-green-100', iconColor: 'text-green-600' },
    { id: 'recovery', label: 'Reprise progressive', icon: Zap, color: 'from-amber-50 to-amber-100', iconColor: 'text-amber-600' },
  ];

  const SPORT_RELATIONS = [
    { id: 'mental', label: 'Exutoire mental', icon: Wind },
    { id: 'discipline', label: 'Discipline', icon: Calendar },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'obligation', label: 'Obligation', icon: Target },
  ];

  const handleSubmit = async () => {
    // Sauvegarder les données dans localStorage pour le mode démo
    localStorage.setItem('onboardingData', JSON.stringify(formData));
    localStorage.setItem('onboardingCompleted', 'true');
    toast.success('Profil complété !');
    setTimeout(() => navigate('/dashboard'), 500);
  };

  const canProceed = () => {
    switch(step) {
      case 1: return formData.sex && formData.age && formData.height && formData.weight;
      case 2: return formData.goal;
      case 3: return formData.sport_relation;
      case 4: return formData.frequency;
      case 5: return formData.sleep_hours && formData.stress_level;
      default: return true;
    }
  };

  // Écran 0 - Welcome
  if (step === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, #6B7280 0%, #D1D5DB 50%, #F3E8DD 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23000' fill-opacity='0.05'/%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="relative z-10 text-center max-w-2xl px-8 fade-in">
          <div className="mb-12">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
              <User className="w-16 h-16 text-white/90" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-5xl font-light text-white mb-6 tracking-tight">
            Bienvenue sur NADYOU
          </h1>
          <p className="text-xl text-white/80 font-light mb-12 leading-relaxed">
            Performance physique et équilibre émotionnel.
            <br />
            Ici, on s'adapte à toi.
          </p>
          
          <Button
            data-testid="start-onboarding-btn"
            onClick={() => setStep(1)}
            size="lg"
            className="bg-white text-gray-800 hover:bg-white/90 text-lg font-medium px-12 py-6 rounded-full"
          >
            Commencer
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  // Écran 1 - Profil de base
  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-2xl p-12 bg-card border border-border shadow-sm slide-up">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map(s => (
                <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-primary' : 'bg-border'}`} />
              ))}
            </div>
            <h2 className="text-3xl font-light text-foreground mb-2">Profil de base</h2>
            <p className="text-sm text-muted-foreground font-light">
              Ces informations permettent d'adapter tes recommandations.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <Label className="text-sm font-medium mb-3 block">Sexe</Label>
              <RadioGroup value={formData.sex} onValueChange={(val) => setFormData({...formData, sex: val})}>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => setFormData({...formData, sex: 'male'})}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.sex === 'male' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                  >
                    <RadioGroupItem value="male" id="male" className="sr-only" />
                    <Label htmlFor="male" className="cursor-pointer font-medium">Homme</Label>
                  </div>
                  <div 
                    onClick={() => setFormData({...formData, sex: 'female'})}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.sex === 'female' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                  >
                    <RadioGroupItem value="female" id="female" className="sr-only" />
                    <Label htmlFor="female" className="cursor-pointer font-medium">Femme</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">Âge</Label>
                <Input
                  data-testid="age-input"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  placeholder="25"
                  className="text-center text-lg"
                  min="13"
                  max="100"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Taille (cm)</Label>
                <Input
                  data-testid="height-input"
                  type="number"
                  step="0.1"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                  placeholder="175"
                  className="text-center text-lg"
                  min="100"
                  max="250"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Poids (kg)</Label>
                <Input
                  data-testid="weight-input"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  placeholder="70"
                  className="text-center text-lg"
                  min="30"
                  max="300"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-12">
            <Button
              variant="ghost"
              onClick={() => setStep(0)}
              className="flex-1"
            >
              Retour
            </Button>
            <Button
              data-testid="next-btn"
              onClick={() => setStep(2)}
              disabled={!canProceed()}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Suivant
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Écran 2 - Objectif
  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-3xl p-12 bg-card border border-border shadow-sm slide-up">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map(s => (
                <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-primary' : 'bg-border'}`} />
              ))}
            </div>
            <h2 className="text-3xl font-light text-foreground mb-2">Ton objectif principal</h2>
            <p className="text-sm text-muted-foreground font-light">
              Un objectif clair permet une progression durable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {GOALS.map(goal => {
              const Icon = goal.icon;
              const isSelected = formData.goal === goal.id;
              return (
                <div
                  key={goal.id}
                  data-testid={`goal-${goal.id}`}
                  onClick={() => setFormData({...formData, goal: goal.id})}
                  className={`p-8 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                    isSelected 
                      ? 'border-primary shadow-lg scale-105' 
                      : 'border-border hover:border-primary/50 hover:scale-102'
                  } bg-gradient-to-br ${goal.color}`}
                >
                  <Icon className={`w-10 h-10 mb-4 ${goal.iconColor}`} strokeWidth={1.5} />
                  <h3 className="text-xl font-medium mb-2">{goal.label}</h3>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={() => setStep(1)}
              className="flex-1"
            >
              Retour
            </Button>
            <Button
              data-testid="next-btn"
              onClick={() => setStep(3)}
              disabled={!canProceed()}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Suivant
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Écran 3 - Relation au sport
  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-3xl p-12 bg-card border border-border shadow-sm slide-up">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map(s => (
                <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-primary' : 'bg-border'}`} />
              ))}
            </div>
            <h2 className="text-3xl font-light text-foreground mb-2">Le sport est pour toi</h2>
            <p className="text-sm text-muted-foreground font-light">
              Ton rapport au sport nous aide à personnaliser tes recommandations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {SPORT_RELATIONS.map(relation => {
              const Icon = relation.icon;
              const isSelected = formData.sport_relation === relation.id;
              return (
                <div
                  key={relation.id}
                  data-testid={`relation-${relation.id}`}
                  onClick={() => setFormData({...formData, sport_relation: relation.id})}
                  className={`p-8 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                    isSelected 
                      ? 'border-primary bg-primary/5 shadow-lg' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Icon className="w-10 h-10 mb-4 text-primary" strokeWidth={1.5} />
                  <h3 className="text-xl font-medium">{relation.label}</h3>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={() => setStep(2)}
              className="flex-1"
            >
              Retour
            </Button>
            <Button
              data-testid="next-btn"
              onClick={() => setStep(4)}
              disabled={!canProceed()}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Suivant
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Écran 4 - Fréquence
  if (step === 4) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-2xl p-12 bg-card border border-border shadow-sm slide-up">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map(s => (
                <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-primary' : 'bg-border'}`} />
              ))}
            </div>
            <h2 className="text-3xl font-light text-foreground mb-2">Fréquence réelle</h2>
            <p className="text-sm text-muted-foreground font-light">
              Cette information garantit des recommandations adaptées à ton rythme.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            <p className="text-center text-lg font-medium">
              Combien de fois t'entraînes-tu réellement par semaine ?
            </p>
            
            <div className="grid grid-cols-3 gap-4">
              {['1-2', '3-4', '5+'].map((freq, idx) => {
                const value = idx === 0 ? '2' : idx === 1 ? '4' : '6';
                const isSelected = formData.frequency === value;
                return (
                  <div
                    key={freq}
                    data-testid={`frequency-${freq}`}
                    onClick={() => setFormData({...formData, frequency: value})}
                    className={`p-8 rounded-2xl cursor-pointer transition-all duration-300 border-2 text-center ${
                      isSelected 
                        ? 'border-primary bg-primary/10 shadow-lg scale-105' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-4xl font-light mb-2">{freq}</div>
                    <div className="text-sm text-muted-foreground">par semaine</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={() => setStep(3)}
              className="flex-1"
            >
              Retour
            </Button>
            <Button
              data-testid="next-btn"
              onClick={() => setStep(5)}
              disabled={!canProceed()}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Suivant
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Écran 5 - Sommeil & Stress
  if (step === 5) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-2xl p-12 bg-card border border-border shadow-sm slide-up">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map(s => (
                <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-primary' : 'bg-border'}`} />
              ))}
            </div>
            <h2 className="text-3xl font-light text-foreground mb-2">Sommeil & stress</h2>
            <p className="text-sm text-muted-foreground font-light">
              Ton profil est presque prêt. NADYOU va maintenant s'adapter à ton état réel.
            </p>
          </div>

          <div className="space-y-10 mb-12">
            <div>
              <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                <Moon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                Heures de sommeil moyennes
              </Label>
              <div className="grid grid-cols-4 gap-3 mt-4">
                {['< 6h', '6-7h', '7-8h', '8h+'].map((sleep, idx) => {
                  const value = ['5', '6.5', '7.5', '8.5'][idx];
                  const isSelected = formData.sleep_hours === value;
                  return (
                    <div
                      key={sleep}
                      data-testid={`sleep-${sleep}`}
                      onClick={() => setFormData({...formData, sleep_hours: value})}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 text-center ${
                        isSelected 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-sm font-medium">{sleep}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                <Wind className="w-5 h-5 text-primary" strokeWidth={1.5} />
                Niveau de stress global
              </Label>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {['Faible', 'Modéré', 'Élevé'].map((stress) => {
                  const isSelected = formData.stress_level === stress.toLowerCase();
                  return (
                    <div
                      key={stress}
                      data-testid={`stress-${stress}`}
                      onClick={() => setFormData({...formData, stress_level: stress.toLowerCase()})}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 text-center ${
                        isSelected 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-sm font-medium">{stress}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={() => setStep(4)}
              className="flex-1"
            >
              Retour
            </Button>
            <Button
              data-testid="complete-btn"
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Terminer
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return null;
};
