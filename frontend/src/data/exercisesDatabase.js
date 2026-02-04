// Base de données d'exercices avec groupes musculaires et catégories

export const EXERCISES_DB = [
  // ==================== POITRINE ====================
  { id: "developpe-couche", name: "Développé couché", muscle_group: "Poitrine", category: "Force", equipment: "Barre", description: "Exercice de base pour la poitrine" },
  { id: "developpe-couche-halteres", name: "Développé couché haltères", muscle_group: "Poitrine", category: "Force", equipment: "Haltères", description: "Variante avec haltères pour plus d'amplitude" },
  { id: "developpe-incline", name: "Développé incliné", muscle_group: "Poitrine", category: "Force", equipment: "Barre", description: "Cible le haut de la poitrine" },
  { id: "developpe-incline-halteres", name: "Développé incliné haltères", muscle_group: "Poitrine", category: "Force", equipment: "Haltères", description: "Variante inclinée avec haltères" },
  { id: "developpe-decline", name: "Développé décliné", muscle_group: "Poitrine", category: "Force", equipment: "Barre", description: "Cible le bas de la poitrine" },
  { id: "ecarte-couche", name: "Écarté couché", muscle_group: "Poitrine", category: "Isolation", equipment: "Haltères", description: "Isolation des pectoraux" },
  { id: "ecarte-poulie", name: "Écarté à la poulie", muscle_group: "Poitrine", category: "Isolation", equipment: "Poulie", description: "Tension constante sur les pectoraux" },
  { id: "pompes", name: "Pompes", muscle_group: "Poitrine", category: "Poids du corps", equipment: "Aucun", description: "Exercice classique au poids du corps" },
  { id: "pompes-inclinees", name: "Pompes inclinées", muscle_group: "Poitrine", category: "Poids du corps", equipment: "Aucun", description: "Version facilitée des pompes" },
  { id: "pompes-declinees", name: "Pompes déclinées", muscle_group: "Poitrine", category: "Poids du corps", equipment: "Aucun", description: "Version avancée des pompes" },
  { id: "dips-pectoraux", name: "Dips pectoraux", muscle_group: "Poitrine", category: "Poids du corps", equipment: "Barres parallèles", description: "Dips penché en avant" },
  { id: "pec-deck", name: "Pec deck (machine)", muscle_group: "Poitrine", category: "Isolation", equipment: "Machine", description: "Machine pour isoler les pectoraux" },
  { id: "pullover", name: "Pullover", muscle_group: "Poitrine", category: "Isolation", equipment: "Haltère", description: "Étirement et contraction des pectoraux" },

  // ==================== DOS ====================
  { id: "tractions", name: "Tractions", muscle_group: "Dos", category: "Poids du corps", equipment: "Barre de traction", description: "Exercice roi pour le dos" },
  { id: "tractions-supination", name: "Tractions supination", muscle_group: "Dos", category: "Poids du corps", equipment: "Barre de traction", description: "Variante ciblant les biceps" },
  { id: "rowing-barre", name: "Rowing barre", muscle_group: "Dos", category: "Force", equipment: "Barre", description: "Exercice de base pour l'épaisseur du dos" },
  { id: "rowing-haltere", name: "Rowing haltère", muscle_group: "Dos", category: "Force", equipment: "Haltère", description: "Rowing unilatéral" },
  { id: "rowing-t-bar", name: "Rowing T-bar", muscle_group: "Dos", category: "Force", equipment: "T-bar", description: "Variante du rowing" },
  { id: "tirage-vertical", name: "Tirage vertical", muscle_group: "Dos", category: "Force", equipment: "Poulie haute", description: "Alternative aux tractions" },
  { id: "tirage-horizontal", name: "Tirage horizontal", muscle_group: "Dos", category: "Force", equipment: "Poulie basse", description: "Pour l'épaisseur du dos" },
  { id: "sousleve-terre", name: "Soulevé de terre", muscle_group: "Dos", category: "Force", equipment: "Barre", description: "Exercice polyarticulaire complet" },
  { id: "sousleve-terre-roumain", name: "Soulevé de terre roumain", muscle_group: "Dos", category: "Force", equipment: "Barre", description: "Cible les ischio-jambiers et le bas du dos" },
  { id: "good-morning", name: "Good morning", muscle_group: "Dos", category: "Force", equipment: "Barre", description: "Renforcement du bas du dos" },
  { id: "hyperextensions", name: "Hyperextensions", muscle_group: "Dos", category: "Isolation", equipment: "Banc", description: "Isolation du bas du dos" },
  { id: "face-pull", name: "Face pull", muscle_group: "Dos", category: "Isolation", equipment: "Poulie", description: "Pour les rhomboïdes et deltoïdes postérieurs" },
  { id: "shrugs", name: "Shrugs (haussements d'épaules)", muscle_group: "Dos", category: "Isolation", equipment: "Haltères", description: "Isolation des trapèzes" },

  // ==================== ÉPAULES ====================
  { id: "developpe-militaire", name: "Développé militaire", muscle_group: "Épaules", category: "Force", equipment: "Barre", description: "Exercice de base pour les épaules" },
  { id: "developpe-halteres", name: "Développé haltères", muscle_group: "Épaules", category: "Force", equipment: "Haltères", description: "Variante avec haltères" },
  { id: "developpe-arnold", name: "Développé Arnold", muscle_group: "Épaules", category: "Force", equipment: "Haltères", description: "Rotation pendant le mouvement" },
  { id: "elevations-laterales", name: "Élévations latérales", muscle_group: "Épaules", category: "Isolation", equipment: "Haltères", description: "Isolation du deltoïde moyen" },
  { id: "elevations-frontales", name: "Élévations frontales", muscle_group: "Épaules", category: "Isolation", equipment: "Haltères", description: "Isolation du deltoïde antérieur" },
  { id: "oiseau", name: "Oiseau (élévations arrière)", muscle_group: "Épaules", category: "Isolation", equipment: "Haltères", description: "Isolation du deltoïde postérieur" },
  { id: "tirage-menton", name: "Tirage menton", muscle_group: "Épaules", category: "Force", equipment: "Barre", description: "Deltoïdes et trapèzes" },
  { id: "rotation-externe", name: "Rotation externe", muscle_group: "Épaules", category: "Isolation", equipment: "Haltère", description: "Renforcement de la coiffe des rotateurs" },

  // ==================== BICEPS ====================
  { id: "curl-barre", name: "Curl barre", muscle_group: "Biceps", category: "Force", equipment: "Barre", description: "Exercice de base pour les biceps" },
  { id: "curl-barre-ez", name: "Curl barre EZ", muscle_group: "Biceps", category: "Force", equipment: "Barre EZ", description: "Moins de stress sur les poignets" },
  { id: "curl-halteres", name: "Curl haltères", muscle_group: "Biceps", category: "Force", equipment: "Haltères", description: "Curl alterné ou simultané" },
  { id: "curl-marteau", name: "Curl marteau", muscle_group: "Biceps", category: "Force", equipment: "Haltères", description: "Cible le brachial et l'avant-bras" },
  { id: "curl-incline", name: "Curl incliné", muscle_group: "Biceps", category: "Isolation", equipment: "Haltères", description: "Étirement maximal du biceps" },
  { id: "curl-concentre", name: "Curl concentré", muscle_group: "Biceps", category: "Isolation", equipment: "Haltère", description: "Isolation maximale" },
  { id: "curl-pupitre", name: "Curl pupitre (Larry Scott)", muscle_group: "Biceps", category: "Isolation", equipment: "Barre EZ", description: "Isolation sur pupitre" },
  { id: "curl-poulie", name: "Curl à la poulie", muscle_group: "Biceps", category: "Isolation", equipment: "Poulie", description: "Tension constante" },

  // ==================== TRICEPS ====================
  { id: "dips-triceps", name: "Dips triceps", muscle_group: "Triceps", category: "Poids du corps", equipment: "Barres parallèles", description: "Corps droit pour cibler les triceps" },
  { id: "developpe-couche-serre", name: "Développé couché serré", muscle_group: "Triceps", category: "Force", equipment: "Barre", description: "Prise serrée pour les triceps" },
  { id: "extensions-triceps", name: "Extensions triceps au-dessus de la tête", muscle_group: "Triceps", category: "Isolation", equipment: "Haltère", description: "Étirement complet des triceps" },
  { id: "barre-front", name: "Barre au front (skull crusher)", muscle_group: "Triceps", category: "Isolation", equipment: "Barre EZ", description: "Isolation des triceps" },
  { id: "pushdown-poulie", name: "Pushdown à la poulie", muscle_group: "Triceps", category: "Isolation", equipment: "Poulie", description: "Exercice classique d'isolation" },
  { id: "kickback", name: "Kickback triceps", muscle_group: "Triceps", category: "Isolation", equipment: "Haltère", description: "Contraction maximale" },
  { id: "pompes-diamant", name: "Pompes diamant", muscle_group: "Triceps", category: "Poids du corps", equipment: "Aucun", description: "Pompes mains rapprochées" },

  // ==================== QUADRICEPS ====================
  { id: "squat", name: "Squat", muscle_group: "Quadriceps", category: "Force", equipment: "Barre", description: "Roi des exercices pour les jambes" },
  { id: "squat-barre-avant", name: "Squat barre avant (front squat)", muscle_group: "Quadriceps", category: "Force", equipment: "Barre", description: "Cible davantage les quadriceps" },
  { id: "squat-goblet", name: "Squat goblet", muscle_group: "Quadriceps", category: "Force", equipment: "Haltère/Kettlebell", description: "Idéal pour apprendre le mouvement" },
  { id: "squat-bulgare", name: "Squat bulgare", muscle_group: "Quadriceps", category: "Force", equipment: "Haltères", description: "Unilatéral, très efficace" },
  { id: "presse-cuisses", name: "Presse à cuisses", muscle_group: "Quadriceps", category: "Force", equipment: "Machine", description: "Alternative au squat" },
  { id: "hack-squat", name: "Hack squat", muscle_group: "Quadriceps", category: "Force", equipment: "Machine", description: "Squat guidé" },
  { id: "fentes", name: "Fentes", muscle_group: "Quadriceps", category: "Force", equipment: "Haltères", description: "Travail unilatéral" },
  { id: "fentes-marchees", name: "Fentes marchées", muscle_group: "Quadriceps", category: "Force", equipment: "Haltères", description: "Fentes en mouvement" },
  { id: "leg-extension", name: "Leg extension", muscle_group: "Quadriceps", category: "Isolation", equipment: "Machine", description: "Isolation des quadriceps" },
  { id: "sissy-squat", name: "Sissy squat", muscle_group: "Quadriceps", category: "Isolation", equipment: "Aucun", description: "Isolation avancée" },

  // ==================== ISCHIO-JAMBIERS ====================
  { id: "leg-curl-couche", name: "Leg curl couché", muscle_group: "Ischio-jambiers", category: "Isolation", equipment: "Machine", description: "Isolation des ischio-jambiers" },
  { id: "leg-curl-assis", name: "Leg curl assis", muscle_group: "Ischio-jambiers", category: "Isolation", equipment: "Machine", description: "Variante assise" },
  { id: "leg-curl-debout", name: "Leg curl debout", muscle_group: "Ischio-jambiers", category: "Isolation", equipment: "Machine", description: "Travail unilatéral" },
  { id: "sousleve-terre-jambes-tendues", name: "Soulevé de terre jambes tendues", muscle_group: "Ischio-jambiers", category: "Force", equipment: "Barre", description: "Étirement des ischio-jambiers" },
  { id: "glute-ham-raise", name: "Glute ham raise", muscle_group: "Ischio-jambiers", category: "Force", equipment: "Banc GHR", description: "Exercice avancé" },
  { id: "nordic-curl", name: "Nordic curl", muscle_group: "Ischio-jambiers", category: "Force", equipment: "Aucun", description: "Exercice excentrique intense" },

  // ==================== FESSIERS ====================
  { id: "hip-thrust", name: "Hip thrust", muscle_group: "Fessiers", category: "Force", equipment: "Barre", description: "Meilleur exercice pour les fessiers" },
  { id: "hip-thrust-unilateral", name: "Hip thrust unilatéral", muscle_group: "Fessiers", category: "Force", equipment: "Banc", description: "Version une jambe" },
  { id: "pont-fessier", name: "Pont fessier (glute bridge)", muscle_group: "Fessiers", category: "Force", equipment: "Aucun", description: "Au sol, avec ou sans poids" },
  { id: "kickback-fessier", name: "Kickback fessier", muscle_group: "Fessiers", category: "Isolation", equipment: "Poulie/Machine", description: "Isolation du grand fessier" },
  { id: "abduction-hanche", name: "Abduction de hanche", muscle_group: "Fessiers", category: "Isolation", equipment: "Machine", description: "Cible le moyen fessier" },
  { id: "fentes-laterales", name: "Fentes latérales", muscle_group: "Fessiers", category: "Force", equipment: "Haltères", description: "Travail dans le plan frontal" },
  { id: "step-up", name: "Step-up", muscle_group: "Fessiers", category: "Force", equipment: "Haltères", description: "Montée sur box" },
  { id: "sumo-squat", name: "Sumo squat", muscle_group: "Fessiers", category: "Force", equipment: "Barre/Haltère", description: "Squat jambes écartées" },

  // ==================== MOLLETS ====================
  { id: "mollets-debout", name: "Mollets debout", muscle_group: "Mollets", category: "Isolation", equipment: "Machine", description: "Cible le gastrocnémien" },
  { id: "mollets-assis", name: "Mollets assis", muscle_group: "Mollets", category: "Isolation", equipment: "Machine", description: "Cible le soléaire" },
  { id: "mollets-presse", name: "Mollets à la presse", muscle_group: "Mollets", category: "Isolation", equipment: "Presse", description: "Sur la presse à cuisses" },
  { id: "mollets-unilateral", name: "Mollets unilatéral", muscle_group: "Mollets", category: "Isolation", equipment: "Haltère", description: "Travail une jambe" },

  // ==================== ABDOMINAUX ====================
  { id: "crunch", name: "Crunch", muscle_group: "Abdominaux", category: "Isolation", equipment: "Aucun", description: "Exercice de base pour les abdos" },
  { id: "crunch-inverse", name: "Crunch inversé", muscle_group: "Abdominaux", category: "Isolation", equipment: "Aucun", description: "Cible le bas des abdos" },
  { id: "releve-jambes", name: "Relevé de jambes suspendu", muscle_group: "Abdominaux", category: "Force", equipment: "Barre de traction", description: "Exercice avancé" },
  { id: "releve-jambes-couche", name: "Relevé de jambes couché", muscle_group: "Abdominaux", category: "Isolation", equipment: "Aucun", description: "Au sol" },
  { id: "planche", name: "Planche (gainage)", muscle_group: "Abdominaux", category: "Isométrique", equipment: "Aucun", description: "Gainage statique" },
  { id: "planche-laterale", name: "Planche latérale", muscle_group: "Abdominaux", category: "Isométrique", equipment: "Aucun", description: "Gainage des obliques" },
  { id: "russian-twist", name: "Russian twist", muscle_group: "Abdominaux", category: "Isolation", equipment: "Poids", description: "Rotation pour les obliques" },
  { id: "bicycle-crunch", name: "Bicycle crunch", muscle_group: "Abdominaux", category: "Isolation", equipment: "Aucun", description: "Crunch avec rotation" },
  { id: "mountain-climbers", name: "Mountain climbers", muscle_group: "Abdominaux", category: "Cardio", equipment: "Aucun", description: "Cardio et gainage" },
  { id: "ab-wheel", name: "Ab wheel (roue abdominale)", muscle_group: "Abdominaux", category: "Force", equipment: "Roue", description: "Exercice avancé" },
  { id: "crunch-poulie", name: "Crunch à la poulie haute", muscle_group: "Abdominaux", category: "Isolation", equipment: "Poulie", description: "Avec résistance" },
  { id: "hollow-body", name: "Hollow body hold", muscle_group: "Abdominaux", category: "Isométrique", equipment: "Aucun", description: "Gainage en creux" },

  // ==================== AVANT-BRAS ====================
  { id: "curl-poignet", name: "Curl poignet", muscle_group: "Avant-bras", category: "Isolation", equipment: "Barre/Haltères", description: "Flexion des poignets" },
  { id: "curl-poignet-inverse", name: "Curl poignet inversé", muscle_group: "Avant-bras", category: "Isolation", equipment: "Barre/Haltères", description: "Extension des poignets" },
  { id: "farmer-walk", name: "Farmer walk (marche du fermier)", muscle_group: "Avant-bras", category: "Force", equipment: "Haltères", description: "Prise et gainage" },

  // ==================== CARDIO ====================
  { id: "course-tapis", name: "Course (tapis)", muscle_group: "Cardio", category: "Cardio", equipment: "Tapis de course", description: "Cardio classique" },
  { id: "velo-elliptique", name: "Vélo elliptique", muscle_group: "Cardio", category: "Cardio", equipment: "Elliptique", description: "Cardio sans impact" },
  { id: "velo-stationnaire", name: "Vélo stationnaire", muscle_group: "Cardio", category: "Cardio", equipment: "Vélo", description: "Cardio assis" },
  { id: "rameur", name: "Rameur", muscle_group: "Cardio", category: "Cardio", equipment: "Rameur", description: "Cardio complet" },
  { id: "corde-sauter", name: "Corde à sauter", muscle_group: "Cardio", category: "Cardio", equipment: "Corde", description: "Cardio et coordination" },
  { id: "burpees", name: "Burpees", muscle_group: "Cardio", category: "Cardio", equipment: "Aucun", description: "Exercice complet haute intensité" },
  { id: "jumping-jacks", name: "Jumping jacks", muscle_group: "Cardio", category: "Cardio", equipment: "Aucun", description: "Échauffement cardio" },
  { id: "box-jumps", name: "Box jumps", muscle_group: "Cardio", category: "Pliométrie", equipment: "Box", description: "Explosivité" },
  { id: "sprint", name: "Sprint", muscle_group: "Cardio", category: "Cardio", equipment: "Aucun", description: "Course haute intensité" },
  { id: "hiit", name: "HIIT (circuit)", muscle_group: "Cardio", category: "Cardio", equipment: "Variable", description: "Entraînement fractionné" },
  { id: "battle-ropes", name: "Battle ropes", muscle_group: "Cardio", category: "Cardio", equipment: "Cordes", description: "Cardio haut du corps" },
  { id: "ski-erg", name: "Ski erg", muscle_group: "Cardio", category: "Cardio", equipment: "Ski erg", description: "Cardio tirage" },

  // ==================== ÉTIREMENTS / MOBILITÉ ====================
  { id: "etirement-quadriceps", name: "Étirement quadriceps", muscle_group: "Mobilité", category: "Étirement", equipment: "Aucun", description: "Debout ou couché" },
  { id: "etirement-ischio", name: "Étirement ischio-jambiers", muscle_group: "Mobilité", category: "Étirement", equipment: "Aucun", description: "Jambe tendue" },
  { id: "etirement-fessiers", name: "Étirement fessiers (pigeon)", muscle_group: "Mobilité", category: "Étirement", equipment: "Aucun", description: "Position du pigeon" },
  { id: "etirement-hanches", name: "Étirement fléchisseurs de hanche", muscle_group: "Mobilité", category: "Étirement", equipment: "Aucun", description: "Fente basse" },
  { id: "etirement-pectoraux", name: "Étirement pectoraux", muscle_group: "Mobilité", category: "Étirement", equipment: "Mur", description: "Bras contre le mur" },
  { id: "etirement-dos", name: "Étirement dos (chat-vache)", muscle_group: "Mobilité", category: "Étirement", equipment: "Aucun", description: "Mobilité colonne" },
  { id: "foam-rolling", name: "Foam rolling", muscle_group: "Mobilité", category: "Récupération", equipment: "Rouleau", description: "Auto-massage" },
  { id: "yoga-flow", name: "Yoga flow", muscle_group: "Mobilité", category: "Mobilité", equipment: "Tapis", description: "Enchaînement de postures" },
];

// Fonction de recherche dans la base de données d'exercices
export const searchExercises = (query) => {
  if (!query || query.length < 1) return EXERCISES_DB;
  
  const normalizedQuery = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  
  return EXERCISES_DB.filter(exercise => {
    const normalizedName = exercise.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedMuscle = exercise.muscle_group.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedCategory = exercise.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    return normalizedName.includes(normalizedQuery) || 
           normalizedMuscle.includes(normalizedQuery) || 
           normalizedCategory.includes(normalizedQuery);
  });
};

// Obtenir tous les groupes musculaires
export const getMuscleGroups = () => {
  return [...new Set(EXERCISES_DB.map(e => e.muscle_group))];
};

// Obtenir les exercices par groupe musculaire
export const getExercisesByMuscleGroup = (muscleGroup) => {
  return EXERCISES_DB.filter(e => e.muscle_group === muscleGroup);
};

// Obtenir un exercice par ID
export const getExerciseById = (id) => {
  return EXERCISES_DB.find(e => e.id === id);
};
