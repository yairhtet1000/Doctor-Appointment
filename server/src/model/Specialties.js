const mongoose = require("mongoose");

const specialtiesSchema = new mongoose.Schema({
  specializedName: {
    type: String,
    required: true,
  },
});

const Specialties = mongoose.model("Specialties", specialtiesSchema);

module.exports = Specialties;
