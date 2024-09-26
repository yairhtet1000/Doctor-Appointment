const mongoose = require("mongoose");

const specialitiesSchema = new mongoose.Schema({
  specializedName: {
    type: String,
    require: true,
  },
});

const Specialities = mongoose.model("Specialities", specialitiesSchema);

module.exports = Specialities;
