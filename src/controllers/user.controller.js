

// Simulacion base de datos
const UsersJSON = require("../data/users.json");

// Metodo GET ID
const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = UsersJSON.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.status(200).json(user);
};

// Metodo GET
const getUsers = (req, res) => {
  const { username, email, created_at } = req.query;

  let resultados = UsersJSON;

  if (username) {
    resultados = resultados.filter(u => u.username.includes(username));
  }

  if (email) {
    resultados = resultados.filter(u => u.email.includes(email));
  }

  if (created_at) {
    resultados = resultados.filter(u => u.created_at.includes(created_at));
  }

  res.status(200).json(resultados);
};

module.exports = { getUserById, getUsers };
