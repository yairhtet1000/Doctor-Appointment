const { Router } = require("express");
const patientController = require("../controllers/PatientController");
const auth = require("../../middleware/auth");

const patientRouter = Router();

//// routes
// get
patientRouter.get("/", patientController.getPatients);
patientRouter.get("/:patientID", patientController.getPatientByID);

// post
patientRouter.post("/register", patientController.createPatient);
patientRouter.post("/login", patientController.patientLogin);

// auth
patientRouter.use(auth);

//// protected routes
// patch
patientRouter.patch("/update/:patientID", patientController.updatePatient);

// delete
patientRouter.delete("/delete/:patientID", patientController.deletePatient);

module.exports = patientRouter;
