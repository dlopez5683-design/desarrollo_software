require("dotenv").config();

const app = require("./src/app");
const conectarBaseDatos = require("./src/config/database");

const PORT = Number(process.env.PORT) || 3000;

const iniciarServidor = async () => {
  try {
    await conectarBaseDatos();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `Servidor ejecutándose en el puerto ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "No se pudo iniciar el servidor:",
      error.message
    );

    process.exit(1);
  }
};

iniciarServidor();