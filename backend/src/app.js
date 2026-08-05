const express = require("express");
const cors = require("cors");

const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    exito: true,
    mensaje: "API del Sistema Help Desk funcionando",
  });
});

app.use("/tickets", ticketRoutes);

app.use((req, res) => {
  res.status(404).json({
    exito: false,
    mensaje: "Ruta no encontrada",
  });
});

module.exports = app;