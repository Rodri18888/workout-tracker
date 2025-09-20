const express = require("express"); // Import express
const app = express(); // Create an instance of express
const { port } = require('../config/env'); // Import the port from the env file
app.use(express.json()); // Para JSON
app.use(express.urlencoded({ extended: true })); // Para formularios

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

// req.headers

app.get('/check-headers', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send("No autorizado: falta token");
  }

  res.status(200).send(`Token recibido: ${token}`);
});

// Cabeceras HTTP

app.post('/upload', (req, res) => {
  // Cabeceras de contenido
  const contentLength = req.get('Content-Length');
  const contentType = req.get('Content-Type');

  // Cabeceras de cliente
  const userAgent = req.get('User-Agent');
  const referer = req.get('Referer');

  // Cabeceras de cache
  const cacheControl = req.get('Cache-Control');
  const ifModifiedSince = req.get('If-Modified-Since');

  console.log(`Recibiendo ${contentLength} bytes de tipo ${contentType}`);

  res.json({
    received: true,
    size: contentLength,
    type: contentType,
    client: userAgent
  });
});

app.get('/data', (req, res) => {
  res.set('Content-Type', 'application/json'); 
  res.set('Cache-Control', 'no-store');

  res.status(200).json({ mensaje: "Datos enviados con cabeceras" });
});

// Middleware simple que revisa cabecera personalizada
function checkApiKey(req, res, next) {
  const apiKey = req.get('X-API-Key');

  if (!apiKey || apiKey !== "12345") {
    return res.status(401).json({ error: "No autorizado, falta o es incorrecta la API Key" });
  }

  next();
}

// Ruta protegida con cabecera
app.get('/secure-data', (req, res) => {
  res.set('X-Powered-By', 'Express-Learning'); // cabecera personalizada en la respuesta
  res.json({ secreto: "Este es un dato protegido 🎉" });
});


// POST

app.post('/users', (req, res) => {
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
});

// PUT y PATCH

// DELETE



// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
