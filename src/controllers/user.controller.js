
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

// Metodo POST

const createUser = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const newUser = {
    id: UsersJSON.length + 1,
    username,
    email,
    password,
    created_at: new Date().toISOString()
  };

  UsersJSON.push(newUser);

  res.status(201).json({ message: "Usuario creado", user: newUser });
};

// Metodos PUT y PATCH

// PUT

const updateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const { username, email, password } = req.body;

    const user = UsersJSON.findIndex(u => u.id === userId);

    if (user === -1) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (!username || !email || !password ) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    UsersJSON[user] = {
        id: userId,
        username,
        email,
        password,
        created_at: UsersJSON[userIndex].created_at
    };

    res.status(200).json({ message: "Usuario actualizado (PUT)", user: UsersJSON[user] });
}


// PATCH

const patchUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const { username, email, password } = req.body;

  const user = UsersJSON.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = password;

  res.status(200).json({ message: "Usuario actualizado parcialmente (PATCH)", user });
};

// Metodo DELETE

const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);

  const user = UsersJSON.findIndex(u => u.id === userId);

  if (user === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  UsersJSON.splice(user, 1);

  res.status(204).send();
};



// Exportacion
module.exports = { getUserById, getUsers, createUser, updateUser, patchUser, deleteUser };
