const express = require("express"); // Import express
const app = express(); // Create an instance of express
const { port } = require('../config/env'); // Import the port from the env file

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


// Metodos GET

app.get('/users', (req, res) => {
  res.json(UsersJSON)
});



// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
