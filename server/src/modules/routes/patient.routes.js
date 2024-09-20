const { Router } = require("express");
const patientController = require("../controllers/PatientController");

const patientRouter = Router();

// get
patientRouter.get("/", patientController.getPatients);

// post
patientRouter.post("/register", patientController.createPatient);
patientRouter.post("/login", patientController.patientLogin);

// delete
patientRouter.delete("/:patientID", patientController.deletePatient);

module.exports = patientRouter;
