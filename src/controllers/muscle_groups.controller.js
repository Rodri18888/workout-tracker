// Simulacion base de datos
const Muscle_groupsJSON = require("../data/muscle_groups.json");

// Metodo GET ID
const getMuscle_groupById = (req, res) => {
  const muscle_groupsId = parseInt(req.params.id);
  const muscle_group = CategoriesJSON.find(u => u.id === muscle_groupsId);

  if (!muscle_group) {
    return res.status(404).json({ error: "Grupo muscular no encontrado" });
  }

  res.status(200).json(muscle_group);
};

// Metodo GET
const getMuscle_groups = (req, res) => {
  const { name_muscle_group } = req.query;

  let resultados = Muscle_groupsJSON;

  if (name_muscle_group) {
    resultados = resultados.filter(u => u.name_muscle_group.includes(name_muscle_group));
  }

  res.status(200).json(resultados);
};

// Metodo POST

const createMuscle_group = (req, res) => {
  const { name_muscle_group } = req.body;

  if (!name_muscle_group) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const newMuscle_group = {
    id: Muscle_groupsJSON.length + 1,
    name_muscle_group
  };

  Muscle_groupsJSON.push(newMuscle_group);

  res.status(201).json({ message: "Grupo muscular creado", muscle_group: newMuscle_group });
};

// Metodo PUT

const updateMuscle_group = (req, res) => {
    const muscle_groupsId = parseInt(req.params.id);
    const { name_muscle_group } = req.body;

    const muscle_group = Muscle_groupsJSON.findIndex(u => u.id === muscle_groupsId);

    if (muscle_group === -1) {
        return res.status(404).json({ error: "Grupo muscular no encontrado" });
    }

    if (!name_muscle_group) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    Muscle_groupsJSON[muscle_group] = {
        id: muscle_groupsId,
        name_muscle_group
    };

    res.status(200).json({ message: "Grupo muscular actualizado (PUT)", muscle_group: Muscle_groupsJSON[muscle_group] });
}

// Metodo DELETE

const deleteMuscle_group = (req, res) => {
  const muscle_groupsId = parseInt(req.params.id);

  const index = Muscle_groupsJSON.findIndex(u => u.id === muscle_groupsId);

  if (index === -1) {
    return res.status(404).json({ error: "Grupo muscular no encontrado" });
  }

  Muscle_groupsJSON.splice(index, 1);

  res.status(200).json({ message: "Grupo muscular eliminado" });
};

// Exportacion
module.exports = { getMuscle_groupById, getMuscle_groups, createMuscle_group, updateMuscle_group, deleteMuscle_group };
