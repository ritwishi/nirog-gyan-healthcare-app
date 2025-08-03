// In-memory storage for demo (use database in production)
let appointments = [];
let appointmentId = 1;

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
const createAppointment = async (req, res, next) => {
  try {
    const {
      patientName,
      email,
      phone,
      doctorId,
      selectedDate,
      selectedTime,
      notes
    } = req.body;

    // Validation
    if (!patientName || !email || !doctorId || !selectedDate || !selectedTime) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if slot is available (simplified check)
    const existingAppointment = appointments.find(
      apt => apt.doctorId === doctorId && 
             apt.selectedDate === selectedDate && 
             apt.selectedTime === selectedTime &&
             apt.status !== 'Cancelled'
    );

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    // Create appointment
    const newAppointment = {
      id: appointmentId++,
      patientName,
      email,
      phone,
      doctorId,
      selectedDate,
      selectedTime,
      notes: notes || '',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    appointments.push(newAppointment);

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: newAppointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Public (should be protected in production)
const getAllAppointments = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Public
const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = appointments.find(apt => apt.id === parseInt(req.params.id));

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel appointment
// @route   PATCH /api/appointments/:id/cancel
// @access  Public
const cancelAppointment = async (req, res, next) => {
  try {
    const appointmentIndex = appointments.findIndex(apt => apt.id === parseInt(req.params.id));

    if (appointmentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    appointments[appointmentIndex] = {
      ...appointments[appointmentIndex],
      status: 'Cancelled',
      updatedAt: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: appointments[appointmentIndex]
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  cancelAppointment
};
