import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Dumbbell, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/utils/api';

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);
    try {
      await api.resetPassword({ token, new_password: password });
      toast.success('Mot de passe réinitialisé avec succès !');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Token invalide ou expiré');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md p-8 bg-card border-border text-center">
          <h1 className="text-2xl font-heading font-black mb-4">LIEN INVALIDE</h1>
          <p className="text-muted-foreground mb-6">
            Ce lien de réinitialisation est invalide ou a expiré.
          </p>
          <Button
            onClick={() => navigate('/forgot-password')}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Demander un nouveau lien
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Dumbbell className="w-10 h-10 text-primary" />
            <span className="text-2xl font-heading font-bold">NADYOU PERFORMANCE</span>
          </div>
          <h1 className="text-3xl font-heading font-black tracking-tight">NOUVEAU MOT DE PASSE</h1>
          <p className="text-muted-foreground mt-2">Créez votre nouveau mot de passe</p>
        </div>

        <Card className="p-8 bg-card border-border">
          <form data-testid="reset-password-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="password">Nouveau mot de passe</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  data-testid="new-password-input"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  data-testid="confirm-password-input"
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-10"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>

            <Button
              data-testid="submit-reset-btn"
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
