const mongoose = require("mongoose");

const conectarBaseDatos = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "La variable MONGODB_URI no está configurada"
    );
  }

  const conexion = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000
  });

  console.log(
    `Base de datos conectada: ${conexion.connection.host}`
  );
};

module.exports = conectarBaseDatos;