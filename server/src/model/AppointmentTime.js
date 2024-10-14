const mongoose = require("mongoose");

const appointmentTimeSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const AppointmentTime = mongoose.model(
  "Appointment_Time",
  appointmentTimeSchema
);

module.exports = AppointmentTime;
