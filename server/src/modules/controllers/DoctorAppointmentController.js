const DoctorAppointment = require("../../model/DoctorAppointment");
const validator = require("validator");

const createDoctorAppointment = async (req, res) => {
  const { appointment_type, doctor_id, date, time } = req.body;

  try {
    const doctorAppointment = new DoctorAppointment({
      appointment_type,
      doctor_id,
      date,
      time,
    });

    await doctorAppointment.save();

    const createdDoctorAppointment = await DoctorAppointment.findById(
      doctorAppointment._id
    )
      .populate("appointment_type", "typeName")
      .populate("doctor_id", "name email")
      .populate("time", "time");

    res.status(200).json({
      message: "Appointment created successfully",
      createdDoctorAppointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const doctorAppointments = await DoctorAppointment.find({
      isArchive: false,
    })
      .populate("appointment_type", "typeName")
      .populate("doctor_id", "name email")
      .populate("time", "time");
    res.status(200).json(doctorAppointments);
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
      )
        .populate("appointment_type", "typeName")
        .populate("doctor_id", "name email")
        .populate("time", "time");
      res.status(200).json(doctorAppointment);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getArchiveDoctorAppointments = async (req, res) => {
  try {
    const archiveDoctorAppointments = await DoctorAppointment.find({
      isArchive: true,
    })
      .populate("appointment_type", "typeName")
      .populate("doctor_id", "name email")
      .populate("time", "time");
    res.status(200).json(archiveDoctorAppointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDoctorAppointment = async (req, res) => {
  const { appointment_type, doctor_id, date, status, time, isArchive } =
    req.body;
  const { doctor_appointment_id } = req.params;

  try {
    const update_doctor_appointment = await DoctorAppointment.findByIdAndUpdate(
      doctor_appointment_id,
      {
        appointment_type,
        doctor_id,
        date,
        status,
        time,
        isArchive,
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

const deleteDoctorAppointments = async (req, res) => {
  const { doctor_appointment_id } = req.params;

  try {
    if (validator.isMongoId(doctor_appointment_id.toString())) {
      const getAppointment = await DoctorAppointment.findOne({
        _id: doctor_appointment_id,
      });

      if (getAppointment) {
        await DoctorAppointment.deleteOne({ _id: doctor_appointment_id });

        res.status(200).json({ message: "Deleted Successfully." });
      } else {
        res.status(404).json({ error: "Doctor_Appointment doesn't exist" });
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
  updateDoctorAppointment,
};
