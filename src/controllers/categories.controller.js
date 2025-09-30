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


// Metodo POST

const createCategory = (req, res) => {
  const { name_category } = req.body;

  if (!name_category) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const newCategory = {
    id: UsersJSON.length + 1,
    name_category
  };

  UsersJSON.push(newCategory);

  res.status(201).json({ message: "Categoria creada", category: newCategory });
};

// Metodo PUT

const updateCategory = (req, res) => {
    const categoryId = parseInt(req.params.id);
    const { name_category } = req.body;

    const category = CategoriesJSON.findIndex(u => u.id === categoryId);

    if (category === -1) {
        return res.status(404).json({ error: "Categoria no encontrada" });
    }

    if (!name_category ) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    UsersJSON[user] = {
        id: categoryId,
        name_category
    };

    res.status(200).json({ message: "Categoria actualizada (PUT)", category: CategoriesJSON[category] });
}

// Metodo DELETE

const deleteCategory = (req, res) => {
  const categoryId = parseInt(req.params.id);

  const user = CategoriesJSON.findIndex(u => u.id === categoryId);

  if (user === -1) {
    return res.status(404).json({ error: "Categoria no encontrada" });
  }

  UsersJSON.splice(category, 1);

  res.status(204).send();
};


// Exportacion

module.exports = { getCategoryById, getCategories, createCategory, updateCategory, deleteCategory }