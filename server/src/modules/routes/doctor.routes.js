const { Router } = require("express");
const doctorController = require("../controllers/DoctorController");

const doctorRouter = Router();

// get
doctorRouter.get("/", doctorController.getDoctors);
doctorRouter.get("/archivedDoctors", doctorController.getArchiveDoctors);
doctorRouter.get("/:_id", doctorController.getDoctorByID);

//post
doctorRouter.post("/create", doctorController.createDoctor);

// patch
doctorRouter.patch("/update/:_id", doctorController.updateDoctor);
doctorRouter.patch("/archive/:_id", doctorController.archiveDoctor);

// delete
doctorRouter.delete("/delete/:_id", doctorController.deleteDoctor);

module.exports = doctorRouter;
