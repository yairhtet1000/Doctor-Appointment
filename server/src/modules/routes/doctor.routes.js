const { Router } = require("express");
const doctorController = require("../controllers/DoctorController");

const doctorRotuer = Router();

// get
doctorRotuer.get("/", doctorController.getDoctors);
doctorRotuer.get("/archivedDoctors", doctorController.getArchiveDoctors);
doctorRotuer.get("/:_id", doctorController.getDoctorByID);

//post
doctorRotuer.post("/create", doctorController.createDoctor);

// patch
doctorRotuer.patch("/update/:_id", doctorController.updateDoctor);
doctorRotuer.patch("/archive/:_id", doctorController.archiveDoctor);

// delete
doctorRotuer.delete("/delete/:_id", doctorController.deleteDoctor);

module.exports = doctorRotuer;
