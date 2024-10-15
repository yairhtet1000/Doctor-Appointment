const mongoose = require("mongoose");

const specialtiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Specialties = mongoose.model("Specialties", specialtiesSchema);

module.exports = Specialties;
