const Patient = require("../model/Patient");

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();

    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPatient = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const patient = new Doctor({ name, email, phone });
    await patient.save();
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPatients,
  createPatient,
};
