const Patient = require("../../model/Patient");
const argon2 = require("argon2");
const validator = require("validator");
const jsonwebtoken = require("jsonwebtoken");

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().select("-password");
    res.status(200).json(patients);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPatientByID = async (req, res) => {
  const { patientID } = req.params;

  try {
    if (!validator.isMongoId(patientID.toString()))
      return res.status(400).json({ error: "Provide Valid ID." });

    const patient = await Patient.findById(patientID).select("-password");

    if (!patient) return res.status(404).json({ error: "Patient Not Found." });

    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPatient = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    if (!isValidEmail(email))
      return res.status(400).json({ error: "Invalid Email Format." });

    const usedEmail = await Patient.findOne({ email });
    const hashedPassword = await argon2.hash(password);

    if (usedEmail)
      return res.status(400).json({ error: "This email is already in use." });

    const patient = new Patient({ name, email, phone, hashedPassword });
    await patient.save();
    res.status(200).json(patient.select("-password"));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const patientLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const getPatient = await Patient.findOne({ email });
    const dbsPassword = getPatient.hashedPassword;
    const truePassword = await argon2.verify(dbsPassword, password);

    if (!getPatient) return res.status(400).json({ error: "Incorrect Email." });

    if (!truePassword)
      return res.status(400).json({ error: "Incorrect Password." });

    const accessToken = jsonwebtoken.sign(
      {
        _id: getPatient.id,
        name: getPatient.name,
      },
      process.env.jwt_salt
    );

    const showPatient = getPatient.select("-password");

    res.status(200).json({
      message: "Login Successful",
      showPatient,
      accessToken,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePatient = async (req, res) => {
  const { patientID } = req.params;
  const updatedData = req.body;

  try {
    if (!validator.isMongoId(patientID.toString()))
      return res.status(400).json({ error: "Provide Valid ID." });

    if (updatedData.email && !isValidEmail(updatedData.email))
      return res.status(400).json({ error: "Invalid Email Format." });

    const patient = await Patient.findByIdAndUpdate(patientID, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!patient) {
      return res.status(404).json({ error: "Patient Not Found." });
    }

    const showPatient = patient.select("-password");

    res.status(200).json(showPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePatient = async (req, res) => {
  const { patientID } = req.params;

  try {
    if (!validator.isMongoId(patientID.toString()))
      return res.status(400).json({ error: "Provide Valid ID." });

    const deletePatient = await Patient.findByIdAndDelete(patientID);

    if (!deletePatient)
      return res.status(404).json({ error: "Patient Not Found." });

    res.status(200).json({ message: "Deleted Successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = {
  getPatients,
  getPatientByID,
  createPatient,
  patientLogin,
  updatePatient,
  deletePatient,
};
