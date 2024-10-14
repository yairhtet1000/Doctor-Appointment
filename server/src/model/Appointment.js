const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    appointment_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment_Type",
      require: true,
    },
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    time: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment_Time",
      required: true,
    },
    isArchive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
