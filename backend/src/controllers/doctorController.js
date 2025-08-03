const doctorsData = require("../data/doctors.json");

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getAllDoctors = async (req, res, next) => {
  try {
    const { specialization, search } = req.query;
    let filteredDoctors = [...doctorsData];

    // Filter by specialization
    if (specialization && specialization !== "All") {
      filteredDoctors = filteredDoctors.filter(
        (doctor) =>
          doctor.specialization.toLowerCase() === specialization.toLowerCase()
      );
    }

    // Search by name
    if (search) {
      filteredDoctors = filteredDoctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.status(200).json({
      success: true,
      count: filteredDoctors.length,
      data: filteredDoctors,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res, next) => {
  try {
    const doctor = doctorsData.find((doc) => doc.id === req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get doctor availability
// @route   GET /api/doctors/:id/availability
// @access  Public
const getDoctorAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    const doctor = doctorsData.find((doc) => doc.id === id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Get day of week from date
    const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const availableSlots = doctor.schedule[dayOfWeek] || [];

    res.status(200).json({
      success: true,
      data: {
        doctorId: id,
        date,
        dayOfWeek,
        availableSlots,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get doctors by specialization
// @route   GET /api/doctors/specialization/:spec
// @access  Public
const getDoctorsBySpecialization = async (req, res, next) => {
  try {
    const { spec } = req.params;

    const filteredDoctors = doctorsData.filter(
      (doctor) => doctor.specialization.toLowerCase() === spec.toLowerCase()
    );

    res.status(200).json({
      success: true,
      count: filteredDoctors.length,
      data: filteredDoctors,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  getDoctorAvailability,
  getDoctorsBySpecialization,
};
