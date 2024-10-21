const DoctorAppointment = require("../../model/DoctorAppointment");
const validator = require("validator");

const createDoctorAppointment = async (req, res) => {
  const docAppointmentData = req.body;

  try {
    const doctorAppointment = new DoctorAppointment(docAppointmentData);
    await doctorAppointment.save();

    res.status(200).json({
      message: "Appointment created successfully",
      doctorAppointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const doctorAppointments = await DoctorAppointment.find({
      isArchive: false,
    });

    res.status(200).json({ doctorAppointments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoctorAppointment = async (req, res) => {
  const { doctor_appointment_id } = req.params;

  try {
    if (validator.isMongoId(doctor_appointment_id.toString())) {
      const doctorAppointment = await DoctorAppointment.findById(
        doctor_appointment_id
      );

      res.status(200).json({ doctorAppointment });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getArchiveDoctorAppointments = async (req, res) => {
  try {
    const archiveDoctorAppointments = await DoctorAppointment.find({
      isArchive: true,
    });

    res.status(200).json({ archiveDoctorAppointments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDoctorAppointment = async (req, res) => {
  const updatedData = req.body;
  const { doctor_appointment_id } = req.params;

  try {
    const update_doctor_appointment = await DoctorAppointment.findByIdAndUpdate(
      doctor_appointment_id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!update_doctor_appointment) {
      res.status(404).json({ error: "appointment not found" });
    }

    const updatedDoctorAppointment = await DoctorAppointment.findById(
      doctor_appointment_id
    );

    res
      .status(200)
      .json({ message: "updated successfully", updatedDoctorAppointment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const SaveArchiveAppointment = async (req, res) => {
  const { doctor_appointment_id } = req.params;
  const { isArchive } = req.body;
  try {
    if (validator.isMongoId(doctor_appointment_id.toString())) {
      const getAppointment = await DoctorAppointment.findByIdAndUpdate(
        doctor_appointment_id,
        {
          isArchive,
        }
      );
      if (getAppointment) {
        const archived_doctor_appointment = await DoctorAppointment.findById(
          doctor_appointment_id
        );
        res
          .status(200)
          .json({ message: "archived", archived_doctor_appointment });
      } else {
        res.status(404).json({ message: "appointment doesn't exit" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDoctorAppointments = async (req, res) => {
  const { doctor_appointment_id } = req.params;

  try {
    if (validator.isMongoId(doctor_appointment_id.toString())) {
      const getAppointment = await DoctorAppointment.findOne({
        _id: doctor_appointment_id,
      });

      if (getAppointment.isArchive) {
        await DoctorAppointment.deleteOne({ _id: doctor_appointment_id });

        res.status(200).json({ message: "Deleted Successfully." });
      } else {
        res
          .status(404)
          .json({ error: "Doctor_Appointment doesn't exist or not archived" });
      }
    } else {
      res.status(400).json({ error: "Enter Valid ID." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createDoctorAppointment,
  getDoctorAppointments,
  getArchiveDoctorAppointments,
  getDoctorAppointment,
  deleteDoctorAppointments,
  SaveArchiveAppointment,
  updateDoctorAppointment,
};
