const { Router } = require("express");
const appointmentRotuer = Router();
const appointmentController = require("../controllers/AppointmentController");

appointmentRotuer.get("/", appointmentController.getAppointments);

//post
appointmentRotuer.post("/create", appointmentController.createAppointment);

//delete
appointmentRotuer.post(
  "/:appointment_id",
  appointmentController.deleteAppointments
);

module.exports = appointmentRotuer;
