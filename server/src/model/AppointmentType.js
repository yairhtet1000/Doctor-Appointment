const mongoose = require("mongoose");

const appointmentTypeSchema = new mongoose.Schema(
  {
    typeName: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const AppointmentType = mongoose.model(
  "Appointment_Type",
  appointmentTypeSchema
);

module.exports = AppointmentType;
