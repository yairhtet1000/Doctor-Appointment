const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor;
