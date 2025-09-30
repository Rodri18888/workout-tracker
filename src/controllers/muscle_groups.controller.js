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

// Exportacion
module.exports = { getMuscle_groupById, getMuscle_groups };
