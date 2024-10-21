const mongoose = require("mongoose");

const appointmentTimeSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      require: true,
      unique: true,
    },
    isArchive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const AppointmentTime = mongoose.model(
  "Appointment_Time",
  appointmentTimeSchema
);

module.exports = AppointmentTime;
