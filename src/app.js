const express = require("express");
const app = express();
const { port } = require("./config/env");

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas
const userRoutes = require("./routes/v1/users.routes");
const categoriesRoutes = require("./routes/v1/categories.routes");
const muscle_groupsRoutes = require("./routes/v1/muscle_groups.routes");
const exercisesRoutes = require("./routes/v1/exercises.routes");


const headersRoutes = require("./routes/v1/headers.routes");
const uploadRoutes = require("./routes/v1/upload.routes");
const secureRoutes = require("./routes/v1/secure.routes");

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

// Montar routers
app.use("/users", userRoutes);
app.use("/categories", categoriesRoutes);
app.use("/muscle_groups", muscle_groupsRoutes);
app.use("/exercises", exercisesRoutes);


app.use("/headers", headersRoutes);
app.use("/files", uploadRoutes);
app.use("/auth", secureRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
