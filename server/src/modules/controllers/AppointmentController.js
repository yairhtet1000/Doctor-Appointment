const Appointment = require("../../model/Appointment");
const validator = require("validator");

const createAppointment = async (req, res) => {
  const { appointment_type, patient_id, doctor_id, date, status, time } =
    req.body;
  try {
    const appointment = new Appointment({
      appointment_type,
      patient_id,
      doctor_id,
      date,
      status,
      time,
    });
    await appointment.save();
    res.status(200).json({ message: "Appointment created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("appointment_type", "typeName")
      .populate("doctor_id", "name email")
      .populate("patient_id", "name email");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointment = async (req, res) => {
  const { appointment_id } = req.params;

  try {
    if (validator.isMongoId(appointment_id.toString())) {
      const appointment = await Appointment.findById(appointment_id);
      res.status(200).json(appointment);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAppointment = async (req, res) => {
  const { appointment_type, patient_id, doctor_id, date, status, time } =
    req.body;
  const { appointment_id } = req.params;

  try {
    const update_appointment = await Appointment.findByIdAndUpdate(
      appointment_id,
      {
        appointment_type,
        patient_id,
        doctor_id,
        date,
        status,
        time,
      }
    );
    if (!update_appointment) {
      res.status(404).json({ error: "appointment not found" });
    }
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAppointments = async (req, res) => {
  const { appointment_id } = req.params;

  try {
    if (validator.isMongoId(appointment_id.toString())) {
      const getAppointment = await Appointment.findOne({ _id: appointment_id });
      if (getAppointment) {
        await Appointment.deleteOne({ _id: appointment_id });
        res.status(200).json({ message: "Deleted Successfully." });
      } else {
        res.status(404).json({ error: "Appointment doesn't exist" });
      }
    } else {
      res.status(400).json({ error: "Enter Valid ID." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  deleteAppointments,
  getAppointment,
  updateAppointment,
};
