import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Apple, Plus, ArrowLeft, Search, X, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { searchFoods, FRENCH_FOODS_DB } from '@/data/foodDatabase';

export const NutritionPage = () => {
  const navigate = useNavigate();
  
  // État local pour les repas (stocké dans localStorage)
  const [meals, setMeals] = useState(() => {
    const saved = localStorage.getItem('nutritionMeals');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  // États pour la recherche
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState('100');
  const searchRef = useRef(null);

  // Sauvegarder les repas dans localStorage
  useEffect(() => {
    localStorage.setItem('nutritionMeals', JSON.stringify(meals));
  }, [meals]);

  // Gérer le clic en dehors du dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Recherche en temps réel
  useEffect(() => {
    if (searchQuery.length >= 1 && !selectedFood) {
      const results = searchFoods(searchQuery);
      setSearchResults(results);
      setShowDropdown(results.length > 0);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery, selectedFood]);

  // Calculer les statistiques sur 7 jours
  const calculateStats = () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentMeals = meals.filter(meal => new Date(meal.date) >= sevenDaysAgo);
    
    return {
      total_calories: recentMeals.reduce((sum, m) => sum + m.calories, 0),
      total_proteins: recentMeals.reduce((sum, m) => sum + m.proteins, 0),
      total_carbs: recentMeals.reduce((sum, m) => sum + m.carbs, 0),
      total_fats: recentMeals.reduce((sum, m) => sum + m.fats, 0),
      meal_count: recentMeals.length
    };
  };

  const stats = calculateStats();

  // Calculer les nutriments en fonction de la quantité
  const calculateNutrients = () => {
    if (!selectedFood) return null;
    
    const multiplier = parseFloat(quantity) / 100;
    
    return {
      calories: (selectedFood.calories || 0) * multiplier,
      proteins: (selectedFood.proteins || 0) * multiplier,
      carbs: (selectedFood.carbs || 0) * multiplier,
      fats: (selectedFood.fats || 0) * multiplier,
      leucine: (selectedFood.leucine || 0) * multiplier,
      isoleucine: (selectedFood.isoleucine || 0) * multiplier,
      valine: (selectedFood.valine || 0) * multiplier,
    };
  };

  const calculated = calculateNutrients();

  // Sélectionner un aliment
  const handleFoodSelect = (food) => {
    setSelectedFood(food);
    setSearchQuery(food.name);
    setShowDropdown(false);
  };

  // Supprimer la sélection (pour changer d'aliment)
  const handleClearSelection = () => {
    setSelectedFood(null);
    setSearchQuery('');
    setQuantity('100');
  };

  // Ajouter un repas
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFood) {
      toast.error('Veuillez sélectionner un aliment');
      return;
    }

    const calc = calculateNutrients();
    
    const newMeal = {
      id: Date.now().toString(),
      food_id: selectedFood.id,
      meal_name: `${selectedFood.name} (${quantity}g)`,
      food_name: selectedFood.name,
      category: selectedFood.category,
      quantity: parseFloat(quantity),
      calories: calc.calories,
      proteins: calc.proteins,
      carbs: calc.carbs,
      fats: calc.fats,
      leucine: calc.leucine,
      isoleucine: calc.isoleucine,
      valine: calc.valine,
      date: new Date().toISOString()
    };

    setMeals(prev => [newMeal, ...prev]);
    toast.success(`${quantity}g de ${selectedFood.name} ajouté !`);
    resetForm();
  };

  // Supprimer un repas
  const handleDeleteMeal = (mealId) => {
    setMeals(prev => prev.filter(m => m.id !== mealId));
    toast.success('Repas supprimé');
  };

  // Remplacer un repas (ouvre le dialog avec l'aliment pré-sélectionné pour modification)
  const handleReplaceMeal = (meal) => {
    // Supprimer l'ancien repas
    setMeals(prev => prev.filter(m => m.id !== meal.id));
    // Ouvrir le dialog pour ajouter un nouveau
    setShowAddDialog(true);
    toast.info('Sélectionnez un nouvel aliment');
  };

  const resetForm = () => {
    setShowAddDialog(false);
    setSearchQuery('');
    setSelectedFood(null);
    setQuantity('100');
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-white/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Button
              data-testid="back-to-dashboard-btn"
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Retour
            </Button>
            <div className="flex items-center gap-2">
              <Apple className="w-6 h-6 text-primary" strokeWidth={1.5} />
              <span className="text-lg font-medium">Nutrition</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Ma nutrition</h1>
            <p className="text-sm text-muted-foreground font-light">Suivi quotidien des macronutriments</p>
          </div>
          <Button
            data-testid="add-meal-btn"
            onClick={() => setShowAddDialog(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un repas
          </Button>
        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card data-testid="stat-calories" className="p-8 bg-white border border-border">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2 font-medium">Calories (7j)</p>
            <p className="text-4xl font-light text-foreground">
              {Math.round(stats.total_calories)}
            </p>
          </Card>
          <Card data-testid="stat-proteins" className="p-8 bg-white border border-border">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2 font-medium">Protéines (7j)</p>
            <p className="text-4xl font-light text-foreground">
              {Math.round(stats.total_proteins)}<span className="text-xl text-muted-foreground">g</span>
            </p>
          </Card>
          <Card data-testid="stat-carbs" className="p-8 bg-white border border-border">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2 font-medium">Glucides (7j)</p>
            <p className="text-4xl font-light text-foreground">
              {Math.round(stats.total_carbs)}<span className="text-xl text-muted-foreground">g</span>
            </p>
          </Card>
          <Card data-testid="stat-fats" className="p-8 bg-white border border-border">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2 font-medium">Lipides (7j)</p>
            <p className="text-4xl font-light text-foreground">
              {Math.round(stats.total_fats)}<span className="text-xl text-muted-foreground">g</span>
            </p>
          </Card>
        </div>

        {/* Historique des repas */}
        <Card data-testid="nutrition-logs" className="p-8 bg-white border border-border">
          <h2 className="text-xl font-medium mb-6">Historique des repas</h2>
          <div className="space-y-4">
            {meals.map((meal) => (
              <div
                key={meal.id}
                data-testid={`nutrition-log-${meal.id}`}
                className="p-6 bg-secondary/30 rounded-lg border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-foreground">{meal.meal_name}</h3>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                      {meal.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground mr-2">
                      {new Date(meal.date).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReplaceMeal(meal)}
                      className="text-muted-foreground hover:text-primary h-8 w-8 p-0"
                      title="Remplacer"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteMeal(meal.id)}
                      className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground font-light">Calories</span>
                    <span className="ml-2 text-primary font-medium">{Math.round(meal.calories)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-light">Protéines</span>
                    <span className="ml-2 text-primary font-medium">{Math.round(meal.proteins)}g</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-light">Glucides</span>
                    <span className="ml-2 text-primary font-medium">{Math.round(meal.carbs)}g</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-light">Lipides</span>
                    <span className="ml-2 text-primary font-medium">{Math.round(meal.fats)}g</span>
                  </div>
                </div>
              </div>
            ))}
            {meals.length === 0 && (
              <p className="text-muted-foreground text-center py-12 font-light">
                Aucun repas enregistré. Cliquez sur "Ajouter un repas" pour commencer.
              </p>
            )}
          </div>
        </Card>
      </main>

      {/* Dialog pour ajouter un repas */}
      <Dialog open={showAddDialog} onOpenChange={(open) => { setShowAddDialog(open); if (!open) resetForm(); }}>
        <DialogContent 
          data-testid="add-meal-dialog" 
          className="bg-white border-border max-w-2xl max-h-[90vh] overflow-visible"
          aria-describedby="meal-dialog-description"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-light">Ajouter un repas</DialogTitle>
          </DialogHeader>
          <p id="meal-dialog-description" className="sr-only">
            Recherchez un aliment et les nutriments seront calculés automatiquement
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Barre de recherche */}
            <div className="relative" ref={searchRef}>
              <Label className="text-sm font-medium mb-2 block">Rechercher un aliment</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  data-testid="food-search-input"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (selectedFood) {
                      setSelectedFood(null);
                    }
                  }}
                  placeholder="Tapez pour rechercher (ex: poulet, riz, banane...)"
                  className="pl-10 pr-10 text-lg"
                  autoComplete="off"
                />
                {selectedFood && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleClearSelection}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              {/* Dropdown des résultats */}
              {showDropdown && searchResults.length > 0 && (
                <div 
                  data-testid="food-dropdown"
                  className="absolute z-50 w-full mt-2 bg-white border border-border rounded-lg shadow-xl max-h-80 overflow-y-auto"
                >
                  {searchResults.map((food, idx) => (
                    <div
                      key={food.id}
                      data-testid={`food-result-${idx}`}
                      onClick={() => handleFoodSelect(food)}
                      className="p-4 hover:bg-primary/5 cursor-pointer border-b border-border last:border-b-0 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-foreground">{food.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{food.category}</p>
                        </div>
                        <div className="text-right text-xs text-muted-foreground">
                          <p>{food.calories} kcal</p>
                          <p>{food.proteins}g prot.</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {showDropdown && searchResults.length === 0 && searchQuery.length >= 1 && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-border rounded-lg shadow-xl p-4">
                  <p className="text-sm text-muted-foreground text-center">Aucun résultat trouvé</p>
                </div>
              )}
            </div>

            {/* Détails de l'aliment sélectionné */}
            {selectedFood && (
              <div className="space-y-6 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-foreground">{selectedFood.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedFood.category}</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleClearSelection}
                    className="text-muted-foreground"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Changer
                  </Button>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Quantité (g)</Label>
                  <Input
                    data-testid="quantity-input"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="text-lg"
                    min="1"
                    step="1"
                  />
                </div>

                {/* Valeurs nutritionnelles calculées */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Valeurs nutritionnelles pour {quantity}g
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Calories</p>
                      <p className="text-2xl font-medium text-primary">
                        {calculated ? Math.round(calculated.calories) : 0}
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Protéines</p>
                      <p className="text-2xl font-medium text-primary">
                        {calculated ? calculated.proteins.toFixed(1) : 0}g
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Glucides</p>
                      <p className="text-2xl font-medium text-primary">
                        {calculated ? calculated.carbs.toFixed(1) : 0}g
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Lipides</p>
                      <p className="text-2xl font-medium text-primary">
                        {calculated ? calculated.fats.toFixed(1) : 0}g
                      </p>
                    </div>
                  </div>

                  {/* Acides aminés BCAA */}
                  {calculated && (calculated.leucine > 0 || calculated.isoleucine > 0 || calculated.valine > 0) && (
                    <div className="pt-4 border-t border-border">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                        Acides aminés (BCAA)
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        {calculated.leucine > 0 && (
                          <div className="p-3 bg-white rounded-lg border border-border">
                            <p className="text-xs text-muted-foreground">Leucine</p>
                            <p className="text-lg font-medium text-primary">{calculated.leucine.toFixed(2)}g</p>
                          </div>
                        )}
                        {calculated.isoleucine > 0 && (
                          <div className="p-3 bg-white rounded-lg border border-border">
                            <p className="text-xs text-muted-foreground">Isoleucine</p>
                            <p className="text-lg font-medium text-primary">{calculated.isoleucine.toFixed(2)}g</p>
                          </div>
                        )}
                        {calculated.valine > 0 && (
                          <div className="p-3 bg-white rounded-lg border border-border">
                            <p className="text-xs text-muted-foreground">Valine</p>
                            <p className="text-lg font-medium text-primary">{calculated.valine.toFixed(2)}g</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  data-testid="submit-meal-btn"
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                >
                  Enregistrer ce repas
                </Button>
              </div>
            )}

            {!selectedFood && (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground font-light italic mb-4">
                  Commencez à taper pour voir les suggestions...
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full">poulet</span>
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full">riz</span>
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full">banane</span>
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full">œufs</span>
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full">saumon</span>
                </div>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
