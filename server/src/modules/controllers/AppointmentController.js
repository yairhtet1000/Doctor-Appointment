const Appointment = require("../../model/Appointment");
const validator = require("validator");

const createAppointment = async (req, res) => {
  const { patient_id, doctor_id, appointment_date } = req.body;
  try {
    const appointment = new Appointment({
      patient_id,
      doctor_id,
      appointment_date,
    });
    await appointment.save();
    res.status(200).json({ message: "appointmnet created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor_id", "name email")
      .populate("patient_id", "name email");
    res.send(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
        res.status(404).json({ error: "appoinment doesn't exist" });
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
};
