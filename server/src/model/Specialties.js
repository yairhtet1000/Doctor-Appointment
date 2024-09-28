const mongoose = require("mongoose");

const specialtiesSchema = new mongoose.Schema({
  specializedName: {
    type: String,
    require: true,
  },
});

const Specialties = mongoose.model("Specialties", specialtiesSchema);

module.exports = Specialties;
