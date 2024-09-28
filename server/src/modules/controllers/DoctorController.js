const Doctor = require("../../model/Doctor");
const validator = require("validator");

const getDoctor = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate(
      "specialty",
      "specializedName"
    );
    res.status(200).json(doctors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createDoctor = async (req, res) => {
  const { name, email, phone, specialty } = req.body;
  try {
    const uniqueEmail = await Doctor.findOne({ email: email });
    if (!uniqueEmail) {
      const doctor = new Doctor({ name, email, phone, specialty });
      await doctor.save();
      res.status(200).json(doctor);
    } else {
      res.status(400).json({ error: "This email is already in use." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  const { doctorID } = req.params;

  try {
    if (validator.isMongoId(doctorID.toString())) {
      const getDoctor = await Doctor.findOne({ _id: doctorID });
      if (getDoctor) {
        await Doctor.deleteOne({ _id: doctorID });
        res.status(200).json({ message: "Deleted Successfully." });
      } else {
        res.status(404).json({ error: "ID Not Found." });
      }
    } else {
      res.status(400).json({ error: "Enter Valid ID." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDoctor,
  createDoctor,
  deleteDoctor,
};
