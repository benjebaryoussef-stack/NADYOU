import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';
import { Apple, Plus, ArrowLeft, Search, Loader2 } from 'lucide-react';
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
  
  // Autocomplete states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodDetails, setFoodDetails] = useState(null);
  const [quantity, setQuantity] = useState('100');
  const searchRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 1 && !selectedFood) {
      const timer = setTimeout(() => {
        searchFoods(searchQuery);
      }, 300);
      return () => clearTimeout(timer);
    } else if (searchQuery.length === 0) {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  const loadData = async () => {
    try {
      const [logsRes, statsRes] = await Promise.all([
        api.getNutrition().catch(() => ({ data: [] })),
        api.getNutritionStats(7).catch(() => ({ data: null }))
      ]);
      setNutritionLogs(logsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error loading nutrition data');
    }
  };

  const searchFoods = async (query) => {
    setSearching(true);
    try {
      const res = await api.searchFood(query);
      setSearchResults(res.data.results || []);
      setShowDropdown(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleFoodSelect = async (food) => {
    setSelectedFood(food);
    setSearchQuery(food.name);
    setShowDropdown(false);
    
    // Récupérer les détails nutritionnels
    try {
      const res = await api.getFoodDetails(food.fdc_id);
      setFoodDetails(res.data);
    } catch (error) {
      toast.error('Erreur lors de la récupération des données');
    }
  };

  const calculateNutrients = () => {
    if (!foodDetails) return null;
    
    const multiplier = parseFloat(quantity) / 100;
    const nutrients = foodDetails.nutrients;
    
    return {
      calories: (nutrients.calories || 0) * multiplier,
      proteins: (nutrients.proteins || 0) * multiplier,
      carbs: (nutrients.carbs || 0) * multiplier,
      fats: (nutrients.fats || 0) * multiplier,
      leucine: (nutrients.leucine || 0) * multiplier,
      isoleucine: (nutrients.isoleucine || 0) * multiplier,
      valine: (nutrients.valine || 0) * multiplier,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFood || !foodDetails) {
      toast.error('Veuillez sélectionner un aliment');
      return;
    }

    const calculated = calculateNutrients();
    
    try {
      const amino_acids = {};
      if (calculated.leucine > 0) amino_acids.leucine = calculated.leucine;
      if (calculated.isoleucine > 0) amino_acids.isoleucine = calculated.isoleucine;
      if (calculated.valine > 0) amino_acids.valine = calculated.valine;

      await api.createNutrition({
        meal_name: `${selectedFood.name} (${quantity}g)`,
        calories: calculated.calories,
        proteins: calculated.proteins,
        carbs: calculated.carbs,
        fats: calculated.fats,
        amino_acids: Object.keys(amino_acids).length > 0 ? amino_acids : null
      });
      
      toast.success(`${quantity}g de ${selectedFood.name} ajouté !`);
      resetForm();
      loadData();
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const resetForm = () => {
    setShowAddDialog(false);
    setSearchQuery('');
    setSelectedFood(null);
    setFoodDetails(null);
    setQuantity('100');
    setSearchResults([]);
  };

  const calculated = foodDetails ? calculateNutrients() : null;

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

        {stats && (
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
        )}

        <Card data-testid="nutrition-logs" className="p-8 bg-white border border-border">
          <h2 className="text-xl font-medium mb-6">Historique</h2>
          <div className="space-y-4">
            {nutritionLogs.map((log, idx) => (
              <div
                key={idx}
                data-testid={`nutrition-log-${idx}`}
                className="p-6 bg-secondary/30 rounded-lg border border-border"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium">{log.meal_name}</h3>
                  <span className="text-xs text-muted-foreground">
                    {new Date(log.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground font-light">Calories</span>
                    <span className="ml-2 text-primary font-medium">{Math.round(log.calories)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-light">Protéines</span>
                    <span className="ml-2 text-primary font-medium">{Math.round(log.proteins)}g</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-light">Glucides</span>
                    <span className="ml-2 text-primary font-medium">{Math.round(log.carbs)}g</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-light">Lipides</span>
                    <span className="ml-2 text-primary font-medium">{Math.round(log.fats)}g</span>
                  </div>
                </div>
              </div>
            ))}
            {nutritionLogs.length === 0 && (
              <p className="text-muted-foreground text-center py-12 font-light">Aucun repas enregistré</p>
            )}
          </div>
        </Card>
      </main>

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
            <div className="relative" ref={searchRef}>
              <Label className="text-sm font-medium mb-2 block">Rechercher un aliment</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  data-testid="food-search-input"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedFood(null);
                    setFoodDetails(null);
                  }}
                  placeholder="Tapez une lettre (ex: b, p, r...)"
                  className="pl-10 pr-10 text-lg"
                  autoComplete="off"
                />
                {searching && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary animate-spin" />
                )}
              </div>
              
              {showDropdown && searchResults.length > 0 && (
                <div 
                  data-testid="food-dropdown"
                  className="absolute z-50 w-full mt-2 bg-white border border-border rounded-lg shadow-xl max-h-80 overflow-y-auto"
                >
                  {searchResults.map((food, idx) => (
                    <div
                      key={idx}
                      data-testid={`food-result-${idx}`}
                      onClick={() => handleFoodSelect(food)}
                      className="p-4 hover:bg-primary/5 cursor-pointer border-b border-border last:border-b-0 transition-colors"
                    >
                      <p className="font-medium text-foreground">{food.name}</p>
                      {food.brand && (
                        <p className="text-xs text-muted-foreground mt-1">{food.brand}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {showDropdown && searchResults.length === 0 && searchQuery.length >= 1 && !searching && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-border rounded-lg shadow-xl p-4">
                  <p className="text-sm text-muted-foreground text-center">Aucun résultat trouvé</p>
                </div>
              )}
            </div>

            {selectedFood && foodDetails && (
              <div className="space-y-6 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">{selectedFood.name}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedFood(null);
                      setFoodDetails(null);
                      setSearchQuery('');
                    }}
                  >
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

                <div className="space-y-4 pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Valeurs nutritionnelles calculées
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
              <p className="text-sm text-muted-foreground text-center py-8 font-light italic">
                Commencez à taper pour voir les suggestions...
              </p>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
