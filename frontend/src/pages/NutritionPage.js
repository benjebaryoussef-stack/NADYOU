import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';
import { Apple, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

export const NutritionPage = () => {
  const navigate = useNavigate();
  const [nutritionLogs, setNutritionLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    meal_name: '',
    calories: '',
    proteins: '',
    carbs: '',
    fats: '',
    leucine: '',
    isoleucine: '',
    valine: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [logsRes, statsRes] = await Promise.all([
        api.getNutrition(),
        api.getNutritionStats(7)
      ]);
      setNutritionLogs(logsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Erreur lors du chargement');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const amino_acids = {};
      if (formData.leucine) amino_acids.leucine = parseFloat(formData.leucine);
      if (formData.isoleucine) amino_acids.isoleucine = parseFloat(formData.isoleucine);
      if (formData.valine) amino_acids.valine = parseFloat(formData.valine);

      await api.createNutrition({
        meal_name: formData.meal_name,
        calories: parseFloat(formData.calories),
        proteins: parseFloat(formData.proteins),
        carbs: parseFloat(formData.carbs),
        fats: parseFloat(formData.fats),
        amino_acids: Object.keys(amino_acids).length > 0 ? amino_acids : null
      });
      toast.success('Repas enregistré !');
      setShowAddDialog(false);
      setFormData({
        meal_name: '',
        calories: '',
        proteins: '',
        carbs: '',
        fats: '',
        leucine: '',
        isoleucine: '',
        valine: ''
      });
      loadData();
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
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
              <Apple className="w-6 h-6 text-primary" />
              <span className="text-lg font-heading font-bold">NUTRITION</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-heading font-black tracking-tight">MA NUTRITION</h1>
          <Button
            data-testid="add-meal-btn"
            onClick={() => setShowAddDialog(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un repas
          </Button>
        </div>

        {stats && (
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card data-testid="stat-calories" className="p-6 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-1">Calories (7j)</p>
              <p className="text-3xl font-heading font-black text-primary">
                {Math.round(stats.total_calories)}
              </p>
            </Card>
            <Card data-testid="stat-proteins" className="p-6 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-1">Protéines (7j)</p>
              <p className="text-3xl font-heading font-black text-primary">
                {Math.round(stats.total_proteins)}g
              </p>
            </Card>
            <Card data-testid="stat-carbs" className="p-6 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-1">Glucides (7j)</p>
              <p className="text-3xl font-heading font-black text-primary">
                {Math.round(stats.total_carbs)}g
              </p>
            </Card>
            <Card data-testid="stat-fats" className="p-6 bg-card border-border">
              <p className="text-sm text-muted-foreground mb-1">Lipides (7j)</p>
              <p className="text-3xl font-heading font-black text-primary">
                {Math.round(stats.total_fats)}g
              </p>
            </Card>
          </div>
        )}

        <Card data-testid="nutrition-logs" className="p-6 bg-card border-border">
          <h2 className="text-xl font-heading font-bold mb-4">HISTORIQUE</h2>
          <div className="space-y-3">
            {nutritionLogs.map((log, idx) => (
              <div
                key={idx}
                data-testid={`nutrition-log-${idx}`}
                className="p-4 bg-secondary rounded-sm border border-border"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-heading font-bold">{log.meal_name}</h3>
                  <span className="text-xs text-muted-foreground">
                    {new Date(log.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Calories:</span>
                    <span className="ml-2 text-primary font-bold">{log.calories}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Protéines:</span>
                    <span className="ml-2 text-primary font-bold">{log.proteins}g</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Glucides:</span>
                    <span className="ml-2 text-primary font-bold">{log.carbs}g</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lipides:</span>
                    <span className="ml-2 text-primary font-bold">{log.fats}g</span>
                  </div>
                </div>
              </div>
            ))}
            {nutritionLogs.length === 0 && (
              <p className="text-muted-foreground text-center py-8">Aucun repas enregistré</p>
            )}
          </div>
        </Card>
      </main>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent data-testid="add-meal-dialog" className="bg-card border-border max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading font-bold text-xl">AJOUTER UN REPAS</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="meal_name">Nom du repas</Label>
              <Input
                data-testid="meal-name-input"
                id="meal_name"
                value={formData.meal_name}
                onChange={(e) => setFormData({ ...formData, meal_name: e.target.value })}
                required
                placeholder="Ex: Petit-déjeuner, Déjeuner..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="calories">Calories</Label>
                <Input
                  data-testid="calories-input"
                  id="calories"
                  type="number"
                  step="0.1"
                  value={formData.calories}
                  onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                  required
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="proteins">Protéines (g)</Label>
                <Input
                  data-testid="proteins-input"
                  id="proteins"
                  type="number"
                  step="0.1"
                  value={formData.proteins}
                  onChange={(e) => setFormData({ ...formData, proteins: e.target.value })}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="carbs">Glucides (g)</Label>
                <Input
                  data-testid="carbs-input"
                  id="carbs"
                  type="number"
                  step="0.1"
                  value={formData.carbs}
                  onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
                  required
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="fats">Lipides (g)</Label>
                <Input
                  data-testid="fats-input"
                  id="fats"
                  type="number"
                  step="0.1"
                  value={formData.fats}
                  onChange={(e) => setFormData({ ...formData, fats: e.target.value })}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Label className="text-sm text-muted-foreground">Acides aminés (optionnel)</Label>
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div>
                  <Label htmlFor="leucine" className="text-xs">Leucine (g)</Label>
                  <Input
                    data-testid="leucine-input"
                    id="leucine"
                    type="number"
                    step="0.1"
                    value={formData.leucine}
                    onChange={(e) => setFormData({ ...formData, leucine: e.target.value })}
                    min="0"
                  />
                </div>
                <div>
                  <Label htmlFor="isoleucine" className="text-xs">Isoleucine (g)</Label>
                  <Input
                    data-testid="isoleucine-input"
                    id="isoleucine"
                    type="number"
                    step="0.1"
                    value={formData.isoleucine}
                    onChange={(e) => setFormData({ ...formData, isoleucine: e.target.value })}
                    min="0"
                  />
                </div>
                <div>
                  <Label htmlFor="valine" className="text-xs">Valine (g)</Label>
                  <Input
                    data-testid="valine-input"
                    id="valine"
                    type="number"
                    step="0.1"
                    value={formData.valine}
                    onChange={(e) => setFormData({ ...formData, valine: e.target.value })}
                    min="0"
                  />
                </div>
              </div>
            </div>

            <Button
              data-testid="submit-meal-btn"
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
            >
              Enregistrer
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
