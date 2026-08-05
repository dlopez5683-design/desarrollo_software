const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      minlength: [3, "El título debe tener al menos 3 caracteres"],
      maxlength: [100, "El título no puede superar los 100 caracteres"],
    },

    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
      minlength: [5, "La descripción debe tener al menos 5 caracteres"],
      maxlength: [500, "La descripción no puede superar los 500 caracteres"],
    },

    categoria: {
      type: String,
      required: [true, "La categoría es obligatoria"],
      enum: {
        values: ["Red", "Hardware", "Software"],
        message: "La categoría debe ser Red, Hardware o Software",
      },
    },

    prioridad: {
      type: String,
      required: [true, "La prioridad es obligatoria"],
      enum: {
        values: ["Alta", "Media", "Baja"],
        message: "La prioridad debe ser Alta, Media o Baja",
      },
    },

    estado: {
      type: String,
      enum: {
        values: ["Abierto", "En Progreso", "Cerrado"],
        message: "El estado debe ser Abierto, En Progreso o Cerrado",
      },
      default: "Abierto",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);