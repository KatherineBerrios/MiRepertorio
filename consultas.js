// Importando datos desde la base de datos
const pool = require("./configBD");

// Función asíncrona para probar la conexión a la base de datos
const conectarDB = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conexión exitosa, fecha y hora actuales:", res.rows[0]);

  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

// *Insertando datos en la tabla canciones utilizando consulta parametrizada
const nuevaCancion = async () => {
  const queryConfig = {
    text: "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3)",
    values: [
      (titulo = cancion.value),
      (artista = artista.value),
      (tono = tono.value),
    ],
  };

try {
  const result = await pool.query(queryConfig);
  console.log("Canción agregada con éxito");
  return result;

} catch (error) {
  console.error("Error al agregar canción", error);
}
  await pool.end();
};

// *Actualizando datos en la tabla estudiantes utilizando consulta parametrizada
const editarCancion = async (data) => {
  const queryConfig = {
    text: "UPDATE canciones SET titulo = $1, artista = $2, tono =$3 WHERE titulo = $1 RETURNING *",
    values: data,
  };

try {
  const result = await pool.query(queryConfig);
  console.log(`Canción ${titulo} editada con éxito`);

} catch (error) {
  console.error("Error al actualizar los datos.", error);
}
await pool.end();
};

// Consultando todos los datos de la tabla canciones utilizando consulta parametrizada
const consultarCanciones = async () => {
  const queryConfig = {
    // Mostrar los datos en forma de arreglos con rowMode
    rowMode: "array",
    text: "SELECT * FROM canciones",
  };

  try {
    const result = await pool.query(queryConfig);
    return result;

  } catch (error) {
    console.error("Error en la consulta de los datos.", error);
    }
await pool.end();
};

// Borrando datos en la tabla canciones utilizando consulta parametrizada
const eliminarCancion = async (id) => {
  const queryConfig = {
  text: `DELETE FROM canciones WHERE id = ${id}`,
  values: [id],
  };

  try {
    const result = await pool.query(queryConfig);
    console.log(`Canción con id ${id} eliminada con éxito`);
    return result;

  } catch (error) {
      console.error("Error en la eliminación de los datos.", error);
    }
    await pool.end();
};

// Exporta los datos de cada función
module.exports = {conectarDB, consultarCanciones, eliminarCancion, nuevaCancion, editarCancion};
