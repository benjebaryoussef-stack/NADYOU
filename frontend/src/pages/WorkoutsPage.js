import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Plus, ArrowLeft, Clock, Timer, Search, X, Trash2, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { EXERCISES_DB, searchExercises, getMuscleGroups } from '@/data/exercisesDatabase';

export const WorkoutsPage = () => {
  const navigate = useNavigate();
  
  // État local pour les entraînements (stocké dans localStorage)
  const [workoutLogs, setWorkoutLogs] = useState(() => {
    const saved = localStorage.getItem('workoutLogs');
    return saved ? JSON.parse(saved) : [];
  });

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [formData, setFormData] = useState({
    sets: '',
    reps: '',
    weight: '',
    notes: ''
  });
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  
  // Recherche et filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef(null);

  // Sauvegarder les entraînements dans localStorage
  useEffect(() => {
    localStorage.setItem('workoutLogs', JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Filtrer les exercices
  const filteredExercises = () => {
    let exercises = EXERCISES_DB;
    
    if (selectedMuscleGroup) {
      exercises = exercises.filter(e => e.muscle_group === selectedMuscleGroup);
    }
    
    if (searchQuery) {
      exercises = searchExercises(searchQuery).filter(e => 
        !selectedMuscleGroup || e.muscle_group === selectedMuscleGroup
      );
    }
    
    return exercises;
  };

  // Statistiques
  const getStats = () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentWorkouts = workoutLogs.filter(w => new Date(w.date) >= sevenDaysAgo);
    
    return {
      totalWorkouts: recentWorkouts.length,
      totalSets: recentWorkouts.reduce((sum, w) => sum + (w.sets || 0), 0),
      totalReps: recentWorkouts.reduce((sum, w) => sum + ((w.sets || 0) * (w.reps || 0)), 0),
      totalVolume: recentWorkouts.reduce((sum, w) => sum + ((w.sets || 0) * (w.reps || 0) * (w.weight || 0)), 0),
    };
  };

  const stats = getStats();
  const muscleGroups = getMuscleGroups();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedExercise) {
      toast.error('Veuillez sélectionner un exercice');
      return;
    }

    const newWorkout = {
      id: Date.now().toString(),
      exercise_id: selectedExercise.id,
      exercise_name: selectedExercise.name,
      muscle_group: selectedExercise.muscle_group,
      category: selectedExercise.category,
      sets: parseInt(formData.sets) || 0,
      reps: parseInt(formData.reps) || 0,
      weight: parseFloat(formData.weight) || 0,
      duration_seconds: timerSeconds || null,
      notes: formData.notes || null,
      date: new Date().toISOString()
    };

    setWorkoutLogs(prev => [newWorkout, ...prev]);
    toast.success(`${selectedExercise.name} enregistré !`);
    resetForm();
  };

  const handleDeleteWorkout = (workoutId) => {
    setWorkoutLogs(prev => prev.filter(w => w.id !== workoutId));
    toast.success('Entraînement supprimé');
  };

  const resetForm = () => {
    setShowAddDialog(false);
    setFormData({ sets: '', reps: '', weight: '', notes: '' });
    setSelectedExercise(null);
    setTimerSeconds(0);
    setIsTimerRunning(false);
    setSearchQuery('');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Grouper les entraînements par jour
  const groupedWorkouts = () => {
    const groups = {};
    workoutLogs.forEach(workout => {
      const date = new Date(workout.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(workout);
    });
    return groups;
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
              <Dumbbell className="w-6 h-6 text-primary" strokeWidth={1.5} />
              <span className="text-lg font-medium">Entraînements</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Mes entraînements</h1>
            <p className="text-sm text-muted-foreground font-light">Suivi de tes performances</p>
          </div>
          <Button
            data-testid="add-workout-btn"
            onClick={() => setShowAddDialog(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvel exercice
          </Button>
        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-white border border-border">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Exercices (7j)</p>
            <p className="text-3xl font-light text-primary">{stats.totalWorkouts}</p>
          </Card>
          <Card className="p-6 bg-white border border-border">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Séries totales</p>
            <p className="text-3xl font-light text-primary">{stats.totalSets}</p>
          </Card>
          <Card className="p-6 bg-white border border-border">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Répétitions</p>
            <p className="text-3xl font-light text-primary">{stats.totalReps}</p>
          </Card>
          <Card className="p-6 bg-white border border-border">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Volume (kg)</p>
            <p className="text-3xl font-light text-primary">{Math.round(stats.totalVolume).toLocaleString()}</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bibliothèque d'exercices */}
          <Card className="p-6 bg-white border border-border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Bibliothèque d'exercices</h2>
              <span className="text-sm text-muted-foreground">{EXERCISES_DB.length} exercices</span>
            </div>
            
            {/* Recherche et filtres */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un exercice..."
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!selectedMuscleGroup ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMuscleGroup('')}
                  className="text-xs"
                >
                  Tous
                </Button>
                {muscleGroups.slice(0, showFilters ? undefined : 6).map(group => (
                  <Button
                    key={group}
                    variant={selectedMuscleGroup === group ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedMuscleGroup(group)}
                    className="text-xs"
                  >
                    {group}
                  </Button>
                ))}
                {muscleGroups.length > 6 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="text-xs"
                  >
                    {showFilters ? 'Moins' : `+${muscleGroups.length - 6}`}
                    <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredExercises().map(exercise => (
                <div
                  key={exercise.id}
                  className="p-4 bg-secondary/30 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedExercise(exercise);
                    setShowAddDialog(true);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-foreground">{exercise.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{exercise.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {exercise.muscle_group}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">{exercise.equipment}</p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredExercises().length === 0 && (
                <p className="text-center text-muted-foreground py-8">Aucun exercice trouvé</p>
              )}
            </div>
          </Card>

          {/* Historique des entraînements */}
          <Card className="p-6 bg-white border border-border">
            <h2 className="text-xl font-medium mb-4">Historique</h2>
            <div className="space-y-6 max-h-[600px] overflow-y-auto">
              {Object.entries(groupedWorkouts()).slice(0, 7).map(([date, workouts]) => (
                <div key={date}>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3 capitalize">
                    {date}
                  </h3>
                  <div className="space-y-2">
                    {workouts.map((workout) => (
                      <div
                        key={workout.id}
                        className="p-4 bg-secondary/30 rounded-lg border border-border"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-foreground">{workout.exercise_name}</h4>
                            <span className="text-xs text-muted-foreground">{workout.muscle_group}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteWorkout(workout.id)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <span className="text-primary font-medium">{workout.sets}x{workout.reps}</span>
                          {workout.weight > 0 && (
                            <span className="text-muted-foreground">{workout.weight} kg</span>
                          )}
                          {workout.duration_seconds > 0 && (
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatTime(workout.duration_seconds)}
                            </span>
                          )}
                        </div>
                        {workout.notes && (
                          <p className="text-xs text-muted-foreground mt-2 italic">{workout.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {workoutLogs.length === 0 && (
                <p className="text-muted-foreground text-center py-12 font-light">
                  Aucun entraînement enregistré. Sélectionne un exercice pour commencer.
                </p>
              )}
            </div>
          </Card>
        </div>
      </main>

      {/* Dialog pour ajouter un entraînement */}
      <Dialog open={showAddDialog} onOpenChange={(open) => { setShowAddDialog(open); if (!open) resetForm(); }}>
        <DialogContent 
          data-testid="add-workout-dialog" 
          className="bg-white border-border max-w-md"
          aria-describedby="workout-dialog-description"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-light">
              {selectedExercise ? selectedExercise.name : 'Nouvel exercice'}
            </DialogTitle>
          </DialogHeader>
          <p id="workout-dialog-description" className="sr-only">
            Enregistrer les détails de ton exercice
          </p>
          
          {!selectedExercise ? (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un exercice..."
                  className="pl-10"
                  autoFocus
                />
              </div>
              <div className="max-h-[400px] overflow-y-auto space-y-2">
                {searchExercises(searchQuery).slice(0, 15).map(exercise => (
                  <div
                    key={exercise.id}
                    className="p-3 bg-secondary/30 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedExercise(exercise)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{exercise.name}</p>
                        <p className="text-xs text-muted-foreground">{exercise.muscle_group}</p>
                      </div>
                      <span className="text-xs bg-secondary px-2 py-1 rounded">{exercise.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{selectedExercise.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedExercise.muscle_group} • {selectedExercise.equipment}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedExercise(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sets">Séries</Label>
                  <Input
                    data-testid="sets-input"
                    id="sets"
                    type="number"
                    value={formData.sets}
                    onChange={(e) => setFormData({ ...formData, sets: e.target.value })}
                    required
                    min="1"
                    placeholder="4"
                  />
                </div>
                <div>
                  <Label htmlFor="reps">Répétitions</Label>
                  <Input
                    data-testid="reps-input"
                    id="reps"
                    type="number"
                    value={formData.reps}
                    onChange={(e) => setFormData({ ...formData, reps: e.target.value })}
                    required
                    min="1"
                    placeholder="12"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Poids (kg)</Label>
                  <Input
                    data-testid="weight-input"
                    id="weight"
                    type="number"
                    step="0.5"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Chronomètre */}
              <div>
                <Label>Chronomètre (optionnel)</Label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 bg-secondary rounded-lg p-4 text-center font-mono text-3xl font-light">
                    {formatTime(timerSeconds)}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      data-testid="timer-toggle-btn"
                      type="button"
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      variant={isTimerRunning ? "destructive" : "default"}
                      size="sm"
                    >
                      <Timer className="w-4 h-4 mr-1" />
                      {isTimerRunning ? 'Stop' : 'Start'}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setTimerSeconds(0)}
                      variant="outline"
                      size="sm"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes (optionnel)</Label>
                <Input
                  data-testid="notes-input"
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ressentis, observations..."
                />
              </div>

              <Button
                data-testid="submit-workout-btn"
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
              >
                Enregistrer
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
