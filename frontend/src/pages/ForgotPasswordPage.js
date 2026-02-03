import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Dumbbell, ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/utils/api';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.requestPasswordReset({ email });
      setSent(true);
      toast.success('Email envoyé ! Vérifiez votre boîte de réception.');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Erreur lors de l\'envoi');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md p-8 bg-card border-border text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-heading font-black mb-4">EMAIL ENVOYÉ !</h1>
          <p className="text-muted-foreground mb-6">
            Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>.
            Vérifiez votre boîte de réception et vos spams.
          </p>
          <Button
            data-testid="back-to-login-btn"
            onClick={() => navigate('/login')}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Retour à la connexion
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Button
          data-testid="back-btn"
          variant="ghost"
          onClick={() => navigate('/login')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Dumbbell className="w-10 h-10 text-primary" />
            <span className="text-2xl font-heading font-bold">NADYOU PERFORMANCE</span>
          </div>
          <h1 className="text-3xl font-heading font-black tracking-tight">MOT DE PASSE OUBLIÉ</h1>
          <p className="text-muted-foreground mt-2">Entrez votre email pour réinitialiser</p>
        </div>

        <Card className="p-8 bg-card border-border">
          <form data-testid="forgot-password-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  data-testid="forgot-email-input"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <Button
              data-testid="submit-forgot-btn"
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Vous vous souvenez ?{' '}
              <Link
                data-testid="back-to-login-link"
                to="/login"
                className="text-primary hover:underline font-semibold"
              >
                Connectez-vous
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
