const Appointment = require("../../model/Appointment");
const validator = require("validator");

const createAppointment = async (req, res) => {
  const { appointment_type, patient_id, doctor_id, date, phone, time } =
    req.body;

  try {
    const appointment = new Appointment({
      appointment_type,
      patient_id,
      doctor_id,
      date,
      phone,
      time,
    });

    await appointment.save();

    const createdAppointment = await Appointment.findById(appointment._id)
      .populate("appointment_type", "typeName")
      .populate("doctor_id", "name email")
      .populate("patient_id", "name email")
      .populate("time", "time");

    res
      .status(200)
      .json({
        message: "Appointment created successfully",
        createdAppointment,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ isArchive: false })
      .populate("appointment_type", "typeName")
      .populate("doctor_id", "name email")
      .populate("patient_id", "name email")
      .populate("time", "time");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointment = async (req, res) => {
  const { appointment_id } = req.params;

  try {
    if (validator.isMongoId(appointment_id.toString())) {
      const appointment = await Appointment.findById(appointment_id)
        .populate("appointment_type", "typeName")
        .populate("doctor_id", "name email")
        .populate("patient_id", "name email")
        .populate("time", "time");
      res.status(200).json(appointment);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getArchiveAppointments = async (req, res) => {
  try {
    const archiveAppointments = await Appointment.find({ isArchive: true })
      .populate("appointment_type", "typeName")
      .populate("doctor_id", "name email")
      .populate("patient_id", "name email")
      .populate("time", "time");
    res.status(200).json(archiveAppointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAppointment = async (req, res) => {
  const {
    appointment_type,
    patient_id,
    doctor_id,
    date,
    phone,
    time,
    isArchive,
  } = req.body;
  const { appointment_id } = req.params;

  try {
    const update_appointment = await Appointment.findByIdAndUpdate(
      appointment_id,
      {
        appointment_type,
        patient_id,
        doctor_id,
        date,
        phone,
        time,
        isArchive,
      }
    );
    if (!update_appointment) {
      res.status(404).json({ error: "appointment not found" });
    }

    const updatedAppointment = await Appointment.findById(appointment_id);

    res
      .status(200)
      .json({ message: "updated successfully", updatedAppointment });
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
  getArchiveAppointments,
  getAppointment,
  deleteAppointments,
  updateAppointment,
};
