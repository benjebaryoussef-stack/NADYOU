import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';
import { Dumbbell, Plus, ArrowLeft, Clock, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export const WorkoutsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [formData, setFormData] = useState({
    sets: '',
    reps: '',
    weight: '',
    duration_seconds: '',
    notes: ''
  });
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const loadData = async () => {
    try {
      const [exercisesRes, workoutsRes] = await Promise.all([
        api.getExercises(),
        api.getWorkouts()
      ]);
      setExercises(exercisesRes.data);
      setWorkoutLogs(workoutsRes.data);
    } catch (error) {
      toast.error('Erreur lors du chargement');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExercise) return;

    try {
      await api.createWorkout({
        exercise_id: selectedExercise.id,
        exercise_name: selectedExercise.name,
        sets: parseInt(formData.sets),
        reps: parseInt(formData.reps),
        weight: parseFloat(formData.weight),
        duration_seconds: timerSeconds || (formData.duration_seconds ? parseInt(formData.duration_seconds) : null),
        notes: formData.notes || null
      });
      toast.success('Entraînement enregistré !');
      setShowAddDialog(false);
      setFormData({ sets: '', reps: '', weight: '', duration_seconds: '', notes: '' });
      setSelectedExercise(null);
      setTimerSeconds(0);
      setIsTimerRunning(false);
      loadData();
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
              <Dumbbell className="w-6 h-6 text-primary" />
              <span className="text-lg font-heading font-bold">ENTRAÎNEMENTS</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-heading font-black tracking-tight">MES ENTRAÎNEMENTS</h1>
          <Button
            data-testid="add-workout-btn"
            onClick={() => setShowAddDialog(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card data-testid="exercises-library" className="p-6 bg-card border-border">
            <h2 className="text-xl font-heading font-bold mb-4">BIBLIOTHÈQUE D'EXERCICES</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {exercises.map(ex => (
                <div
                  key={ex.id}
                  data-testid={`exercise-${ex.id}`}
                  className="p-4 bg-secondary rounded-sm border border-border hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedExercise(ex);
                    setShowAddDialog(true);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-heading font-bold">{ex.name}</h3>
                      <p className="text-sm text-muted-foreground">{ex.muscle_group}</p>
                    </div>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-sm">
                      {ex.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card data-testid="recent-workouts" className="p-6 bg-card border-border">
            <h2 className="text-xl font-heading font-bold mb-4">SÉANCES RÉCENTES</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {workoutLogs.slice(0, 10).map((log, idx) => (
                <div
                  key={idx}
                  data-testid={`workout-log-${idx}`}
                  className="p-3 bg-secondary rounded-sm border border-border"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-heading font-bold text-sm">{log.exercise_name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {new Date(log.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-primary font-mono">{log.sets}x{log.reps}</span>
                    <span className="text-muted-foreground">{log.weight}kg</span>
                    {log.duration_seconds && (
                      <span className="text-muted-foreground">{formatTime(log.duration_seconds)}</span>
                    )}
                  </div>
                </div>
              ))}
              {workoutLogs.length === 0 && (
                <p className="text-muted-foreground text-center py-8">Aucun entraînement enregistré</p>
              )}
            </div>
          </Card>
        </div>
      </main>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent data-testid="add-workout-dialog" className="bg-card border-border max-w-md" aria-describedby="workout-dialog-description">
          <DialogHeader>
            <DialogTitle className="font-heading font-bold text-xl">
              {selectedExercise ? selectedExercise.name : 'AJOUTER ENTRAÎNEMENT'}
            </DialogTitle>
          </DialogHeader>
          <p id="workout-dialog-description" className="sr-only">
            Formulaire pour enregistrer un entraînement avec séries, répétitions, poids et chronomètre
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!selectedExercise && (
              <div>
                <Label>Exercice</Label>
                <Select onValueChange={(value) => setSelectedExercise(exercises.find(e => e.id === value))}>
                  <SelectTrigger data-testid="exercise-select">
                    <SelectValue placeholder="Sélectionner un exercice" />
                  </SelectTrigger>
                  <SelectContent>
                    {exercises.map(ex => (
                      <SelectItem key={ex.id} value={ex.id}>{ex.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

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
                />
              </div>
              <div>
                <Label htmlFor="reps">Reps</Label>
                <Input
                  data-testid="reps-input"
                  id="reps"
                  type="number"
                  value={formData.reps}
                  onChange={(e) => setFormData({ ...formData, reps: e.target.value })}
                  required
                  min="1"
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
                  required
                  min="0"
                />
              </div>
            </div>

            <div>
              <Label>Chronomètre</Label>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 bg-secondary rounded-sm p-3 text-center font-mono text-2xl font-bold">
                  {formatTime(timerSeconds)}
                </div>
                <Button
                  data-testid="timer-toggle-btn"
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  variant={isTimerRunning ? "destructive" : "default"}
                >
                  <Timer className="w-4 h-4 mr-2" />
                  {isTimerRunning ? 'Stop' : 'Start'}
                </Button>
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
              disabled={!selectedExercise}
            >
              Enregistrer
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
