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