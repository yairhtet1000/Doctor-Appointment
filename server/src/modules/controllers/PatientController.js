const Patient = require("../../model/Patient");
const argon2 = require("argon2");
const validator = require("validator");

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPatient = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const uniqueEmail = await Patient.findOne({ email: email });
    const hashedPassword = await argon2.hash(password);

    if (!uniqueEmail) {
      const patient = new Patient({ name, email, phone, hashedPassword });
      await patient.save();
      res.status(200).json(patient);
    } else {
      res.status(400).json({ error: "This email is already in use." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const patientLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const getPatient = await Patient.findOne({ email: email });
    const dbsPassword = getPatient.hashedPassword;
    const verifyPassword = await argon2.verify(dbsPassword, password);

    if (getPatient && verifyPassword) {
      res.status(200).json({ message: "Login Successful." });
    } else {
      res.status(400).json({ error: "Incorrect Email OR Password." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePatient = async (req, res) => {
  const { patientID } = req.params;

  try {
    if (validator.isMongoId(patientID.toString())) {
      const getPatient = await Patient.findOne({ _id: patientID });
      if (getPatient) {
        await Patient.deleteOne({ _id: patientID });
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
  getPatients,
  createPatient,
  patientLogin,
  deletePatient,
};
