const { Router } = require("express");
const doctorController = require("../controllers/DoctorController");

const doctorRotuer = Router();

// get
doctorRotuer.get("/allDoctor", doctorController.getDoctors);
doctorRotuer.get("/oneDoctor/:doctorID", doctorController.getDoctorByID);
doctorRotuer.get("/archives", doctorController.getArchiveDoctors);

//post
doctorRotuer.post("/create", doctorController.createDoctor);

// patch
doctorRotuer.patch("/update/:doctorID", doctorController.updateDoctor);
doctorRotuer.patch("/archive/:doctorID", doctorController.archiveDoctor);

// delete
doctorRotuer.delete("/delete/:doctorID", doctorController.deleteDoctor);

module.exports = doctorRotuer;
