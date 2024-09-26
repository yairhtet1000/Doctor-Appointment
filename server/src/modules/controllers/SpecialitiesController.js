const Specialities = require("../../model/Specialities");
const validator = require("validator");

const createSpecialities = async (req, res) => {
  const { name } = req.body;
  try {
    const speciality = new Specialities({ specializedName: name });
    await speciality.save();
    res.status(200).json({ message: "speciality created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSpecialities = async (req, res) => {
  try {
    const specialities = await Specialities.find();
    res.status(200).json(specialities);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteSpecialities = async (req, res) => {
  const { speciality_id } = req.params;
  console.log(speciality_id);

  try {
    if (validator.isMongoId(speciality_id.toString())) {
      const getSpeciality = await Specialities.findOne({ _id: speciality_id });
      if (getSpeciality) {
        await Specialities.deleteOne({ _id: speciality_id });
        res.status(200).json({ message: "Deleted Successfully." });
      } else {
        res.status(404).json({ error: "speciality Not Found." });
      }
    } else {
      res.status(400).json({ error: "Enter Valid ID." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSpecialities,
  getSpecialities,
  deleteSpecialities,
};
