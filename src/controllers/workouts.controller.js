// Simulación base de datos
const WorkoutsJSON = require("../data/workouts.json");

// Metodo GET ID
const getWorkoutById = (req, res) => {
  const workoutId = parseInt(req.params.id);
  const workout = WorkoutsJSON.find(w => w.id === workoutId);

  if (!workout) {
    return res.status(404).json({ error: "Workout no encontrado" });
  }

  res.status(200).json(workout);
};

// Metodo GET
const getWorkouts = (req, res) => {
  const { user_id, name, date } = req.query;

  let resultados = WorkoutsJSON;

  if (user_id) {
    resultados = resultados.filter(w => w.user_id === parseInt(user_id));
  }

  if (name) {
    resultados = resultados.filter(w => w.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (date) {
    resultados = resultados.filter(w => w.date.includes(date));
  }

  res.status(200).json(resultados);
};

// Metodo POST
const createWorkout = (req, res) => {
    const { user_id, name, exercises, duration, date } = req.body;
  
    if (!user_id || !name || !exercises || !duration || !date) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
  
    const newWorkout = {
      id: WorkoutsJSON.length + 1,
      user_id,
      name,
      exercises,
      duration,
      date
    };
  
    WorkoutsJSON.push(newWorkout);
  
    res.status(201).json({ message: "Workout creado", workout: newWorkout });
  };

  // Metodo PUT
const updateWorkout = (req, res) => {
    const workoutId = parseInt(req.params.id);
    const { user_id, name, exercises, duration, date } = req.body;
  
    const index = WorkoutsJSON.findIndex(w => w.id === workoutId);
  
    if (index === -1) {
      return res.status(404).json({ error: "Workout no encontrado" });
    }
  
    if (!user_id || !name || !exercises || !duration || !date) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
  
    WorkoutsJSON[index] = {
      id: workoutId,
      user_id,
      name,
      exercises,
      duration,
      date
    };
  
    res.status(200).json({ message: "Workout actualizado (PUT)", workout: WorkoutsJSON[index] });
  };
  
  // Metodo PATCH
  const patchWorkout = (req, res) => {
    const workoutId = parseInt(req.params.id);
    const { user_id, name, exercises, duration, date } = req.body;
  
    const workout = WorkoutsJSON.find(w => w.id === workoutId);
  
    if (!workout) {
      return res.status(404).json({ error: "Workout no encontrado" });
    }
  
    if (user_id) workout.user_id = user_id;
    if (name) workout.name = name;
    if (exercises) workout.exercises = exercises;
    if (duration) workout.duration = duration;
    if (date) workout.date = date;
  
    res.status(200).json({ message: "Workout actualizado parcialmente (PATCH)", workout });
  };

  // Metodo DELETE
const deleteWorkout = (req, res) => {
    const workoutId = parseInt(req.params.id);
  
    const index = WorkoutsJSON.findIndex(w => w.id === workoutId);
  
    if (index === -1) {
      return res.status(404).json({ error: "Workout no encontrado" });
    }
  
    WorkoutsJSON.splice(index, 1);
  
    res.status(204).send();
  };
  
  // Exportación
  module.exports = { getWorkoutById, getWorkouts, createWorkout, updateWorkout, patchWorkout, deleteWorkout };