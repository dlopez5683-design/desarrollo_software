const mongoose = require("mongoose");
const Ticket = require("../models/Ticket");

// GET /tickets
const obtenerTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });

    return res.status(200).json({
      exito: true,
      cantidad: tickets.length,
      datos: tickets,
    });
  } catch (error) {
    return res.status(500).json({
      exito: false,
      mensaje: "No se pudieron obtener los tickets",
      error: error.message,
    });
  }
};

// GET /tickets/:id
const obtenerTicketPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        exito: false,
        mensaje: "El identificador del ticket no es válido",
      });
    }

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        exito: false,
        mensaje: "Ticket no encontrado",
      });
    }

    return res.status(200).json({
      exito: true,
      datos: ticket,
    });
  } catch (error) {
    return res.status(500).json({
      exito: false,
      mensaje: "No se pudo obtener el ticket",
      error: error.message,
    });
  }
};

// POST /tickets
const crearTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);

    return res.status(201).json({
      exito: true,
      mensaje: "Ticket registrado correctamente",
      datos: ticket,
    });
  } catch (error) {
    return res.status(400).json({
      exito: false,
      mensaje: "No se pudo registrar el ticket",
      error: error.message,
    });
  }
};

// PUT /tickets/:id
const actualizarTicket = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        exito: false,
        mensaje: "El identificador del ticket no es válido",
      });
    }

    const ticketActualizado = await Ticket.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!ticketActualizado) {
      return res.status(404).json({
        exito: false,
        mensaje: "Ticket no encontrado",
      });
    }

    return res.status(200).json({
      exito: true,
      mensaje: "Ticket actualizado correctamente",
      datos: ticketActualizado,
    });
  } catch (error) {
    return res.status(400).json({
      exito: false,
      mensaje: "No se pudo actualizar el ticket",
      error: error.message,
    });
  }
};

// DELETE /tickets/:id
const eliminarTicket = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        exito: false,
        mensaje: "El identificador del ticket no es válido",
      });
    }

    const ticketEliminado = await Ticket.findByIdAndDelete(id);

    if (!ticketEliminado) {
      return res.status(404).json({
        exito: false,
        mensaje: "Ticket no encontrado",
      });
    }

    return res.status(200).json({
      exito: true,
      mensaje: "Ticket eliminado correctamente",
      datos: ticketEliminado,
    });
  } catch (error) {
    return res.status(500).json({
      exito: false,
      mensaje: "No se pudo eliminar el ticket",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerTickets,
  obtenerTicketPorId,
  crearTicket,
  actualizarTicket,
  eliminarTicket,
};