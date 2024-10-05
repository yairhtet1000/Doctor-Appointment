const mongoose = require("mongoose");

const hospitalLocationSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const HospitalLocation = mongoose.model(
  "Hospital_Location",
  hospitalLocationSchema
);

module.exports = HospitalLocation;
