const Specialties = require("../../model/Specialties");
const validator = require("validator");

const createSpecialties = async (req, res) => {
  const { name } = req.body;

  try {
    const SpecialtyExist = await Specialties.findOne({ name });

    if (SpecialtyExist)
      return res.status(409).json({ error: "specialty already exist" });

    const specialty = new Specialties({ name });
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

    const specialties = await Specialties.find({ isArchive: false });
    res.status(200).json(specialties);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getArchiveSpecialties = async (req, res) => {
  try {
    const specialties = await Specialties.find({ isArchive: true });
    res.status(200).json(specialties);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSpecialty = async (req, res) => {
  const { specialty_id } = req.params;
  try {
    const specialty = await Specialties.findById(specialty_id);
    res.status(200).json({ specialty });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateSpecialty = async (req, res) => {
  const { name } = req.body;
  const { specialty_id } = req.params;

  try {
    const specialty = await Specialties.findByIdAndUpdate(specialty_id, {
      name,
    });

    if (!specialty) {
      res.status(404).json({ error: "specialty not found" });
    }
    const updatedSpecialty = await Specialties.findById(specialty_id);
    res.status(200).json({ message: "updated successfully", updatedSpecialty });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const saveArchiveSpecialty = async (req, res) => {
  const { specialty_id } = req.params;
  const { isArchive } = req.body;
  try {
    if (validator.isMongoId(specialty_id.toString())) {
      const getSpecialty = await Specialties.findByIdAndUpdate(specialty_id, {
        isArchive,
      });
      if (getSpecialty) {
        const archived_specialty = await Specialties.findById(specialty_id);
        res.status(200).json({ message: "archived", archived_specialty });
      } else {
        res.status(404).json({ message: "appointment time doesn't exit" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteSpecialties = async (req, res) => {
  const { specialty_id } = req.params;

  try {
    if (validator.isMongoId(specialty_id.toString())) {
      const getSpecialty = await Specialties.findOne({ _id: specialty_id });

      if (getSpecialty.isArchive) {
        await Specialties.deleteOne({ _id: specialty_id });
        res.status(200).json({ message: "Deleted Successfully." });
      } else {
        res
          .status(404)
          .json({ error: "Specialty Not Found. Or Specialty is not archived" });
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
  updateSpecialty,
  saveArchiveSpecialty,
  getArchiveSpecialties,
  deleteSpecialties,
};
