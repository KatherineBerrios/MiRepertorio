// Importando librerías
const express = require("express");
const path = require("path");

// Crea una instancia de Express
const app = express();

// Define el puerto en el que la aplicación escuchará
const port = 3000;

//Configurar el servidor para servir archivos estáticos
app.use(express.static(path.join(__dirname)));

//Configurar el servidor para recibir payloads
app.use(express.json());

// Importando datos desde consultas.js
const {
  consultarCanciones,
  eliminarCancion,
  editarCancion,
  conectarDB,
  nuevaCancion,
} = require("./consultas");

// Llamamos a la función para ejecutar la consulta
nuevaCancion();
eliminarCancion();
editarCancion();
consultarCanciones();
conectarDB();

// Ruta raíz GET para servir index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Ruta POST/cancion para insertar datos en la tabla canciones
app.post("/cancion", async (req, res) => {
  try {
    // Almacenando en un arreglo el objeto recibido en el cuerpo de la consulta
    const data = Object.values(req.body);
    // Devuelve la respuesta a la aplicación cliente
    const respuesta = await nuevaCancion(data);
    res.json(respuesta)

  } catch (error) {
    console.error("Error al agregar canción", error);
    res.status(500).send("Internal server error");
  }
});

// Ruta GET/canciones para devolver un JSON con los registros de la tabla canciones
app.get("/canciones", async (req, res) => {
  try {
    const respuesta = await consultarCanciones();
    res.json(respuesta)

  } catch (error) {
    console.error("Error al agregar canción", error);
    res.status(500).send("Internal server error");
  }
});

// Ruta PUT/cancion para actualizar un registro de la tabla canciones
app.put("/cancion", async (req, res) => {
try {
    // Almacenando en un arreglo el objeto recibido en el cuerpo de la consulta
    const data = Object.values(req.body);
    // Devuelve la respuesta a la aplicación cliente
    const respuesta = await editarCancion(data);
    res.json(respuesta)

} catch (error) {
    console.error("Error al editar canción", error);
    res.status(500).send("Internal server error");
  }
});

// Ruta DELETE /cancion para eliminar un registro de la tabla canciones
app.delete("/cancion", async (req, res) => {
  try {
    const {id} = req.query
    const respuesta = await eliminarCancion(id);
    res.json(respuesta)

  } catch (error) {
    console.error("Error al eliminar canción", error);
    res.status(500).send("Internal server error");
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(
    `Servidor escuchando en http://localhost:${port}, ${process.pid}`
  );
});