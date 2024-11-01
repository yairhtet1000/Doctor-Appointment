const mongoose = require("mongoose");

const doctorAppointmentSchema = new mongoose.Schema({
  appointment_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment_Type",
    require: true,
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
    type: Boolean,
    required: true,
    default: false,
  },
  time: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment_Time",
      required: true,
    },
  ],
  isArchive: {
    type: Boolean,
    default: false,
  },
});

const doctorAppointment = mongoose.model(
  "Doctor_Appointment",
  doctorAppointmentSchema
);
module.exports = doctorAppointment;
