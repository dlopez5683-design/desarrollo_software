const mongoose = require("mongoose");

const conectarBaseDatos = async () => {
  try {
    const conexion = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `Base de datos conectada: ${conexion.connection.host}`
    );
  } catch (error) {
    console.error(
      "Error al conectar con MongoDB:",
      error.message
    );

    process.exit(1);
  }
};

module.exports = conectarBaseDatos;