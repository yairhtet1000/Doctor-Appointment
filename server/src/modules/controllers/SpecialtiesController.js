const Specialties = require("../../model/Specialties");
const validator = require("validator");

const createSpecialties = async (req, res) => {
  const name = req.body;

  try {
    const specialty = new Specialties(name);
    await specialty.save();

    res
      .status(200)
      .json({ message: "Specialty created successfully", specialty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSpecialties = async (req, res) => {
  try {
    const specialties = await Specialties.find();
    res.status(200).json(specialties);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSpecialty = async (req, res) => {
  const { speciality_id } = req.params;
  try {
    const specialty = await Specialties.findById(speciality_id);
    res.status(200).json(specialty);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateSpeciality = async (req, res) => {
  const { name } = req.body;
  const { speciality_id } = req.params;

  try {
    const speciality = await Specialties.findByIdAndUpdate(speciality_id, {
      name,
    });

    if (!speciality) {
      res.status(404).json({ error: "speciality not found" });
    }
    const updatedSpeciality = await Specialties.findById(speciality_id);
    res
      .status(200)
      .json({ message: "updated successfully", updatedSpeciality });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteSpecialties = async (req, res) => {
  const { specialty_id } = req.params;

  try {
    if (validator.isMongoId(specialty_id.toString())) {
      const getSpecialty = await Specialties.findOne({ _id: specialty_id });

      if (getSpecialty) {
        await Specialties.deleteOne({ _id: specialty_id });
        res.status(200).json({ message: "Deleted Successfully." });
      } else {
        res.status(404).json({ error: "Specialty Not Found." });
      }
    } else {
      res.status(400).json({ error: "Enter Valid ID." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSpecialties,
  getSpecialties,
  getSpecialty,
  updateSpeciality,
  deleteSpecialties,
};
