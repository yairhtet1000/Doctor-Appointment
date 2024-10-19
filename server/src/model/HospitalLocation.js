const mongoose = require("mongoose");

const hospitalLocationSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const HospitalLocation = mongoose.model(
  "Hospital_Location",
  hospitalLocationSchema
);

module.exports = HospitalLocation;
