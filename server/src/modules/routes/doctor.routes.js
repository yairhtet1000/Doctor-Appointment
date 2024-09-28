const { Router } = require("express");
const doctorController = require("../controllers/DoctorController");

const doctorRotuer = Router();

// get
doctorRotuer.get("/", doctorController.getDoctor);

//post
doctorRotuer.post("/create", doctorController.createDoctor);

// delete
doctorRotuer.delete("/:doctorID", doctorController.deleteDoctor);

module.exports = doctorRotuer;
