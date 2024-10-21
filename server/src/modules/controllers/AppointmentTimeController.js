const AppointmentTime = require("../../model/AppointmentTime");
const validator = require("validator");

const createAppointmentTime = async (req, res) => {
  const { time } = req.body;
  try {
    const appointmentTimeExist = await AppointmentTime.findOne({ time });

    if (appointmentTimeExist)
      return res.status(409).json({ error: "time already exist" });

    const appointment_time = new AppointmentTime({ time });
    await appointment_time.save();

    res.status(200).json({
      message: "appointment type created successfully",
      appointment_time,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointmentTimes = async (req, res) => {
  try {
    const appointment_time = await AppointmentTime.find();

    res.status(200).json({ appointment_time });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getArchiveAppointmentTimes = async (req, res) => {
  try {
    const appointment_time = await AppointmentTime.find({ isArchive: true });

    res.status(200).json(appointment_time);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAppointmentTime = async (req, res) => {
  const { appointment_time_id } = req.params;

  try {
    if (validator.isMongoId(appointment_time_id)) {
      const appointmentTime = await AppointmentTime.findById(
        appointment_time_id
      );

      res.status(200).json({ appointmentTime });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAppointmentTime = async (req, res) => {
  const { time } = req.body;
  const { appointment_time_id } = req.params;

  try {
    const update_appointment_time = await AppointmentTime.findByIdAndUpdate(
      appointment_time_id,
      {
        time,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!update_appointment_time) {
      res.status(404).json({ error: "appointment time not found" });
    }

    const updatedAppointmentTime = await AppointmentTime.findById(
      appointment_time_id
    );

    res
      .status(200)
      .json({ message: "updated successfully", updatedAppointmentTime });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const saveArchiveAppointmentTime = async (req, res) => {
  const { appointment_time_id } = req.params;
  const { isArchive } = req.body;
  try {
    if (validator.isMongoId(appointment_time_id.toString())) {
      const getAppointment = await AppointmentTime.findByIdAndUpdate(
        appointment_time_id,
        {
          isArchive,
        }
      );
      if (getAppointment) {
        const archived_appointment_time = await AppointmentTime.findById(
          appointment_time_id
        );
        res
          .status(200)
          .json({ message: "archived", archived_appointment_time });
      } else {
        res.status(404).json({ message: "appointment time doesn't exit" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAppointmentTime = async (req, res) => {
  const { appointment_time_id } = req.params;

  try {
    if (!validator.isMongoId(appointment_time_id.toString()))
      return res.status(400).json({ error: "Enter Valid ID." });

    const get_appointment_time = await AppointmentTime.findOne({
      _id: appointment_time_id,
    });

    if (!get_appointment_time.isArchive)
      return res.status(404).json({
        error: "appointment time Not Found Or appointment time is not archived",
      });

    await AppointmentTime.deleteOne({ _id: appointment_time_id });

    res.status(200).json({ message: "Deleted Successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAppointmentTime,
  getAppointmentTimes,
  getAppointmentTime,
  getArchiveAppointmentTimes,
  updateAppointmentTime,
  saveArchiveAppointmentTime,
  deleteAppointmentTime,
};
