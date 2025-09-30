// Simulación base de datos
const ExercisesJSON = require("../data/exercises.json");

// Metodo GET ID
const getExerciseById = (req, res) => {
  const exerciseId = parseInt(req.params.id);
  const exercise = ExercisesJSON.find(e => e.id === exerciseId);

  if (!exercise) {
    return res.status(404).json({ error: "Ejercicio no encontrado" });
  }

  res.status(200).json(exercise);
};

// Metodo GET
const getExercises = (req, res) => {
  const { name, category, muscle_group, difficulty } = req.query;

  let resultados = ExercisesJSON;

  if (name) {
    resultados = resultados.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (category) {
    resultados = resultados.filter(e => e.category === parseInt(category));
  }

  if (muscle_group) {
    resultados = resultados.filter(e => e.muscle_group === parseInt(muscle_group));
  }

  if (difficulty) {
    resultados = resultados.filter(e => e.difficulty.toLowerCase() === difficulty.toLowerCase());
  }

  res.status(200).json(resultados);
};

// Metodo POST
const createExercise = (req, res) => {
  const { name, category, muscle_group, description, equipment, difficulty, duration, repetitions, sets } = req.body;

  if (!name || !category || !muscle_group || !description || !equipment || !difficulty || !duration || !repetitions || !sets) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const newExercise = {
    id: ExercisesJSON.length + 1,
    name,
    category,
    muscle_group,
    description,
    equipment,
    difficulty,
    duration,
    repetitions,
    sets
  };

  ExercisesJSON.push(newExercise);

  res.status(201).json({ message: "Ejercicio creado", exercise: newExercise });
};


// Exportación
module.exports = { getExerciseById, getExercises, createExercise, updateExercise, patchExercise, deleteExercise };