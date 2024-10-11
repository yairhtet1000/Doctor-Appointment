const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  specialty: {
    type: mongoose.Types.ObjectId,
    ref: "Specialties",
    required: true,
  },
  isArchive: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
module.exports = Doctor;
