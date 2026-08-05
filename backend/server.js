const dns = require("node:dns");

// Fuerza a Node.js a usar servidores DNS públicos
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const app = require("./src/app");
const conectarBaseDatos = require("./src/config/database");

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await conectarBaseDatos();

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
    process.exit(1);
  }
};

iniciarServidor();