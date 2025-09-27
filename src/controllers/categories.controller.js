// Simulacion base de datos
const CategoriesJSON = require("../data/categories.json");

// Metodo GET ID
const getCategoryById = (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = CategoriesJSON.find(u => u.id === categoryId);

  if (!category) {
    return res.status(404).json({ error: "Categoria no encontrada" });
  }

  res.status(200).json(category);
};

// Metodo GET
const getCategories = (req, res) => {
  const { name_category } = req.query;

  let resultados = CategoriesJSON;

  if (name_category) {
    resultados = resultados.filter(u => u.name_category.includes(name_category));
  }

  res.status(200).json(resultados);
};


// Exportacion

module.exports = { getCategoryById, getCategories }