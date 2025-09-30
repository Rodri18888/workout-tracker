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


// Exportación
module.exports = { getExerciseById, getExercises, createExercise, updateExercise, patchExercise, deleteExercise };