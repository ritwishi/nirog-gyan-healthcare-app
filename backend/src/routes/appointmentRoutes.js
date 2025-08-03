const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  cancelAppointment,
} = require("../controllers/appointmentController");

// POST /api/appointments
router.post("/", createAppointment);

// GET /api/appointments
router.get("/", getAllAppointments);

// GET /api/appointments/:id
router.get("/:id", getAppointmentById);

// PATCH /api/appointments/:id/cancel
router.patch("/:id/cancel", cancelAppointment);

module.exports = router;
