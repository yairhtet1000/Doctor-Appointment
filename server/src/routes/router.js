const { Router } = require("express");
const rotuer = Router();
const doctorController = require("../controllers/DoctorController");

rotuer.get("/", doctorController.getDoctor);

//post
rotuer.post("/c", doctorController.createDoctor);

module.exports = rotuer;
