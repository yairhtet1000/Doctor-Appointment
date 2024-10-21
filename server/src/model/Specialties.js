const mongoose = require("mongoose");

const specialtiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isArchive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Specialties = mongoose.model("Specialties", specialtiesSchema);

module.exports = Specialties;
