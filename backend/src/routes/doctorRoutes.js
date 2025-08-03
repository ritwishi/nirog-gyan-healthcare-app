const express = require("express");
const router = express.Router();

const {
  getAllDoctors,
  getDoctorById,
  getDoctorAvailability,
  getDoctorsBySpecialization,
} = require("../controllers/doctorController");

// GET /api/doctors
router.get("/", getAllDoctors);

// GET /api/doctors/specialization/:spec
router.get("/specialization/:spec", getDoctorsBySpecialization);

// GET /api/doctors/:id
router.get("/:id", getDoctorById);

// GET /api/doctors/:id/availability
router.get("/:id/availability", getDoctorAvailability);

module.exports = router;
