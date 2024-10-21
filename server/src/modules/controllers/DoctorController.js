const Doctor = require("../../model/Doctor");
const validator = require("validator");

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isArchive: false });

    if (!doctors) return res.status(404).json({ error: "There Is No Doctor." });

    res.status(200).json(doctors);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getDoctorByID = async (req, res) => {
  const { doctorID } = req.params;

  try {
    const doctor = await Doctor.findById(doctorID);

    if (!doctor) return res.status(404).json({ error: "Doctor Not Found." });

    res.status(200).json(doctor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getArchiveDoctors = async (req, res) => {
  try {
    const archiveDoctors = await Doctor.find({ isArchive: true });

    if (!archiveDoctors)
      return res.status(404).json({ error: "There Is No Doctor." });

    res.status(200).json(archiveDoctors);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createDoctor = async (req, res) => {
  const docInfo = req.body;

  try {
    if (!isValidEmail(docInfo.email))
      return res.status(400).json({ error: "Invalid Email Format." });

    const usedEmail = await Doctor.findOne({ email: docInfo.email });

    if (usedEmail)
      return res.status(400).json({ error: "This email is already in use." });

    const doctor = new Doctor(docInfo);
    await doctor.save();
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDoctor = async (req, res) => {
  const { doctorID } = req.params;
  const updateRequest = req.body;

  try {
    if (!validator.isMongoId(doctorID.toString()))
      return res.status(400).json({ error: "Provide Valid ID." });

    if (updateRequest.email && !isValidEmail(updateRequest.email))
      return res.status(400).json({ error: "Invalid Email Format." });

    const updatedData = await Doctor.findByIdAndUpdate(
      doctorID,
      updateRequest,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedData)
      return res.status(404).json({ error: "Doctor Not Found." });

    res.status(200).json({ updatedData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  const { doctorID } = req.params;

  try {
    if (!validator.isMongoId(doctorID.toString()))
      return res.status(400).json({ error: "Enter Valid ID." });

    const deleteDoctor = await Doctor.findByIdAndDelete(doctorID);

    if (!deleteDoctor)
      return res.status(404).json({ error: "Doctor Not Found." });

    res.status(200).json({ message: "Deleted Successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const archiveDoctor = async (req, res) => {
  const { doctorID } = req.params;
  const isArchive = req.body;

  try {
    const updatedData = await Doctor.findByIdAndUpdate(doctorID, isArchive, {
      new: true,
      runValidators: true,
    });

    if (!updatedData)
      return res.status(404).json({ error: "Doctor Not Found." });

    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = {
  getDoctors,
  getDoctorByID,
  getArchiveDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  archiveDoctor,
};
