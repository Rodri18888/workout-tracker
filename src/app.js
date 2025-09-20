const express = require("express"); // Import express
const app = express(); // Create an instance of express
const { port } = require('../config/env'); // Import the port from the env file
app.use(express.json()); // Para JSON

// Inicializacion del servidor y primera ruta
app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});


// Base de datos simulacion

const UsersJSON = [
  {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "password": "hashedpassword123",
    "created_at": "2025-09-01T10:15:00Z"
  },
  {
    "id": 2,
    "username": "janedoe",
    "email": "jane@example.com",
    "password": "hashedpassword456",
    "created_at": "2025-09-05T09:30:00Z"
  }
];


// Logica

// USERS

// GET, req.query

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = UsersJSON.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.status(200).json(user);
});

app.get('/users', (req, res) => {
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
});

// POST



// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
