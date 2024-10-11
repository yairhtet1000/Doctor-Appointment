const { Router } = require("express");
const appointmentRotuer = Router();
const appointmentController = require("../controllers/AppointmentController");
const appointmentTypeController = require("../controllers/AppointmentTypeController");

//get
appointmentRotuer.get("/", appointmentController.getAppointments);
appointmentRotuer.get("/:appointment_id", appointmentController.getAppointment);

//post
appointmentRotuer.post("/create", appointmentController.createAppointment);

//update
appointmentRotuer.put(
  "/update/:appointment_id",
  appointmentController.updateAppointment
);

//delete
appointmentRotuer.delete(
  "/:appointment_id",
  appointmentController.deleteAppointments
);

//appointment type
//get
appointmentRotuer.get(
  "/types/all",
  appointmentTypeController.getAppointmentTypes
);

//create
appointmentRotuer.post(
  "/type/create",
  appointmentTypeController.createAppointmentType
);

appointmentRotuer.delete(
  "/type/delete/:appointment_type_id",
  appointmentTypeController.deleteAppointmentType
);

module.exports = appointmentRotuer;
