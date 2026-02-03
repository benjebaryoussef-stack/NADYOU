import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/utils/api';
import { Dumbbell, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

export const OnboardingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    goal: ''
  });

  const handleSubmit = async () => {
    try {
      await api.updateProfile({
        age: parseInt(formData.age),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        fitness_goal: formData.goal,
        onboarding_completed: true
      });
      toast.success('Profil complété avec succès !');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.age && formData.height && formData.weight;
    if (step === 2) return formData.goal;
    return true;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl p-8 bg-card border-border">
        <div className="flex items-center gap-3 mb-8">
          <Dumbbell className="w-10 h-10 text-primary" />
          <div>
            <h1 className="text-3xl font-heading font-black tracking-tight">BIENVENUE {user?.name.toUpperCase()}</h1>
            <p className="text-muted-foreground">Configurons votre profil fitness</p>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          {[1, 2].map(s => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition-colors ${
                s <= step ? 'bg-primary' : 'bg-secondary'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold mb-6">INFORMATIONS PHYSIQUES</h2>
            
            <div>
              <Label htmlFor="age">Âge (années)</Label>
              <Input
                data-testid="onboarding-age-input"
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="Ex: 25"
                className="mt-2"
                min="13"
                max="100"
              />
            </div>

            <div>
              <Label htmlFor="height">Taille (cm)</Label>
              <Input
                data-testid="onboarding-height-input"
                id="height"
                type="number"
                step="0.1"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="Ex: 175"
                className="mt-2"
                min="100"
                max="250"
              />
            </div>

            <div>
              <Label htmlFor="weight">Poids (kg)</Label>
              <Input
                data-testid="onboarding-weight-input"
                id="weight"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="Ex: 70"
                className="mt-2"
                min="30"
                max="300"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold mb-6">VOTRE OBJECTIF</h2>
            <p className="text-muted-foreground mb-4">Quel est votre objectif principal ?</p>
            
            <RadioGroup
              value={formData.goal}
              onValueChange={(value) => setFormData({ ...formData, goal: value })}
            >
              <Card
                data-testid="goal-masse"
                className={`p-6 cursor-pointer transition-all ${
                  formData.goal === 'prise_masse' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setFormData({ ...formData, goal: 'prise_masse' })}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="prise_masse" id="prise_masse" />
                  <div>
                    <Label htmlFor="prise_masse" className="text-lg font-heading font-bold cursor-pointer">
                      💪 Prise de Masse
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Gagner du muscle et augmenter votre force
                    </p>
                  </div>
                </div>
              </Card>

              <Card
                data-testid="goal-perte"
                className={`p-6 cursor-pointer transition-all ${
                  formData.goal === 'perte_poids' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setFormData({ ...formData, goal: 'perte_poids' })}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="perte_poids" id="perte_poids" />
                  <div>
                    <Label htmlFor="perte_poids" className="text-lg font-heading font-bold cursor-pointer">
                      🔥 Perte de Poids
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Brûler des graisses et vous affiner
                    </p>
                  </div>
                </div>
              </Card>

              <Card
                data-testid="goal-maintien"
                className={`p-6 cursor-pointer transition-all ${
                  formData.goal === 'maintien' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setFormData({ ...formData, goal: 'maintien' })}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="maintien" id="maintien" />
                  <div>
                    <Label htmlFor="maintien" className="text-lg font-heading font-bold cursor-pointer">
                      ⚡ Maintien Musculaire
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Conserver votre masse musculaire et performances
                    </p>
                  </div>
                </div>
              </Card>
            </RadioGroup>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button
              data-testid="back-btn"
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              Retour
            </Button>
          )}
          
          {step < 2 ? (
            <Button
              data-testid="next-btn"
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Suivant
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              data-testid="complete-btn"
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Terminer
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};