const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
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
    experience: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    hospitalLocation: {
      type: mongoose.Types.ObjectId,
      ref: "Hospital_Location",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    timeTable: {
      type: mongoose.Types.ObjectId,
      ref: "Appointment_Time",
      required: true,
    },
    isArchive: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", DoctorSchema);
module.exports = Doctor;
