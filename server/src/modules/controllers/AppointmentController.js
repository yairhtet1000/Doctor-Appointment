const Appointment = require("../../model/Appointment");
const validator = require("validator");

const createAppointment = async (req, res) => {
  const appointmentData = req.body;

  try {
    const appointment = new Appointment(appointmentData);

    await appointment.save();

    res.status(200).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ isArchive: false });

    res.status(200).json({ appointments });
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

const getArchiveAppointments = async (req, res) => {
  try {
    const archiveAppointments = await Appointment.find({ isArchive: true });

    res.status(200).json({ archiveAppointments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAppointment = async (req, res) => {
  const updatedData = req.body;
  const { appointment_id } = req.params;

  try {
    const update_appointment = await Appointment.findByIdAndUpdate(
      appointment_id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!update_appointment) {
      return res.status(404).json({ error: "appointment not found" });
    }
    const updatedAppointment = await Appointment.findById(appointment_id);

    res
      .status(200)
      .json({ message: "updated successfully", updatedAppointment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const SaveArchiveAppointment = async (req, res) => {
  const { appointment_id } = req.params;
  const { isArchive } = req.body;
  try {
    if (validator.isMongoId(appointment_id.toString())) {
      const getAppointment = await Appointment.findByIdAndUpdate(
        appointment_id,
        {
          isArchive,
        }
      );
      if (getAppointment) {
        const archived_appointment = await Appointment.findById(appointment_id);
        res.status(200).json({ message: "archived", archived_appointment });
      } else {
        res.status(404).json({ message: "appointment doesn't exit" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAppointments = async (req, res) => {
  const { appointment_id } = req.params;

  try {
    if (validator.isMongoId(appointment_id.toString())) {
      const getAppointment = await Appointment.findOne({ _id: appointment_id });

      if (getAppointment.isArchive) {
        await Appointment.deleteOne({ _id: appointment_id });

        res.status(200).json({ message: "Deleted Successfully." });
      } else {
        res.status(404).json({
          error: "Appointment doesn't exist OR appointment is not archive",
        });
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
  SaveArchiveAppointment,
  deleteAppointments,
  updateAppointment,
};
