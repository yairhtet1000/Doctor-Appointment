const HospitalLocation = require("../../model/HospitalLocation");
const validator = require("validator");

const createHospitalLocation = async (req, res) => {
  const { location, city, address } = req.body;

  try {
    const hostipalLocation = new HospitalLocation({ location, city, address });
    await hostipalLocation.save();
    res.status(200).json({ message: "hostipal Location created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHospitalLocations = async (req, res) => {
  try {
    const hospitalLocation = await HospitalLocation.find();
    res.status(200).json(hospitalLocation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getHospitalLocation = async (req, res) => {
  const { location_id } = req.params;
  try {
    if (validator.isMongoId(location_id.toString())) {
      const location = await HospitalLocation.findById(location_id);
      res.status(200).json(location);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateHospitalLocation = async (req, res) => {
  const { location, city, address } = req.body;
  const { location_id } = req.params;

  try {
    const update_location = await HospitalLocation.findByIdAndUpdate(
      location_id,
      {
        location,
        city,
        address,
      }
    );
    if (!update_location) {
      res.status(404).json({ error: "hospital location not found" });
    }
    res.status(200).json({ message: "updated location successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteHospitalLocation = async (req, res) => {
  const { location_id } = req.params;

  try {
    if (validator.isMongoId(location_id.toString())) {
      const getLocation = await HospitalLocation.findOne({
        _id: location_id,
      });
      if (getLocation) {
        await HospitalLocation.deleteOne({ _id: location_id });
        res.status(200).json({ message: "Deleted Successfully." });
      } else {
        res.status(404).json({ error: "location Not Found." });
      }
    } else {
      res.status(400).json({ error: "Enter Valid ID." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createHospitalLocation,
  getHospitalLocation,
  getHospitalLocations,
  deleteHospitalLocation,
  updateHospitalLocation,
};