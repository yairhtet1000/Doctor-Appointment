const Doctor = require("../model/Doctor");

const getDoctor = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    console.log(doctors);

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDoctor = async (req, res) => {
  console.log(req.body);

  const { name } = req.body;
  try {
    const doctor = new Doctor({ name });
    await doctor.save();
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDoctor,
  createDoctor,
};
