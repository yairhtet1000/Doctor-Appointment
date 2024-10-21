const AppointmentType = require("../../model/AppointmentType");
const validator = require("validator");

const createAppointmentType = async (req, res) => {
  const { name } = req.body;
  try {
    const appointmentExist = await AppointmentType.findOne({ typeName: name });

    if (appointmentExist)
      return res.status(409).json({ error: "type already exist" });

    const appointment_type = new AppointmentType({ typeName: name });
    await appointment_type.save();

    res.status(200).json({
      message: "appointment type created successfully",
      appointment_type,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointmentType = async (req, res) => {
  const { appointment_type_id } = req.params;

  try {
    if (validator.isMongoId(appointment_type_id)) {
      const appointmentType = await AppointmentType.findById(
        appointment_type_id
      );

      res.status(200).json({ appointmentType });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointmentTypes = async (req, res) => {
  try {
    const appointment_type = await AppointmentType.find();

    res.status(200).json({ appointment_type });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getArchiveAppointmentTypes = async (req, res) => {
  try {
    const appointment_type = await AppointmentType.find({ isArchive: true });

    res.status(200).json(appointment_type);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateAppointmentType = async (req, res) => {
  const { name } = req.body;
  const { appointment_type_id } = req.params;

  try {
    const update_appointment_type = await AppointmentType.findByIdAndUpdate(
      appointment_type_id,
      {
        typeName: name,
      }
    );

    if (!update_appointment_type) {
      res.status(404).json({ error: "appointment type not found" });
    }

    const updatedAppointmentType = await AppointmentType.findById(
      appointment_type_id
    );

    res
      .status(200)
      .json({ message: "updated successfully", updatedAppointmentType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const saveArchiveAppointmentType = async (req, res) => {
  const { appointment_type_id } = req.params;
  const { isArchive } = req.body;
  try {
    if (validator.isMongoId(appointment_type_id.toString())) {
      const getAppointmentType = await AppointmentType.findByIdAndUpdate(
        appointment_type_id,
        {
          isArchive,
        }
      );
      if (getAppointmentType) {
        const archived_appointment_type = await AppointmentType.findById(
          appointment_type_id
        );
        res
          .status(200)
          .json({ message: "archived", archived_appointment_type });
      } else {
        res.status(404).json({ message: "appointment time doesn't exit" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAppointmentType = async (req, res) => {
  const { appointment_type_id } = req.params;

  try {
    if (validator.isMongoId(appointment_type_id.toString())) {
      const get_appointment_type = await AppointmentType.findOne({
        _id: appointment_type_id,
      });

      if (get_appointment_type.isArchive) {
        await AppointmentType.deleteOne({ _id: appointment_type_id });
        res.status(200).json({ message: "Deleted Successfully." });
      } else {
        res.status(404).json({
          error: "appointment type Not Found. Or type is not archived",
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
  createAppointmentType,
  getAppointmentTypes,
  getAppointmentType,
  getArchiveAppointmentTypes,
  saveArchiveAppointmentType,
  updateAppointmentType,
  deleteAppointmentType,
};
