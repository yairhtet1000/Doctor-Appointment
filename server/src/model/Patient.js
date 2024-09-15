const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
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

const Patinet = mongoose.model("Patient", patientSchema);
module.exports = Patinet;
