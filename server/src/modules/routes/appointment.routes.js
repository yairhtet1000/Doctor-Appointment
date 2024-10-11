const { Router } = require("express");
const appointmentRotuer = Router();
const appointmentController = require("../controllers/AppointmentController");
const appointmentTypeController = require("../controllers/AppointmentTypeController");
const AppointmentTimeController = require("../controllers/AppointmentTimeController");

appointmentRotuer.get("/", appointmentController.getAppointments);
appointmentRotuer.get("/:appointment_id", appointmentController.getAppointment);
appointmentRotuer.get("/archive", appointmentController.getArchiveAppointments);
//post
appointmentRotuer.post("/create", appointmentController.createAppointment);

//update
appointmentRotuer.patch(
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

appointmentRotuer.get(
  "/type/:appointment_type_id",
  appointmentTypeController.getAppointmentType
);

appointmentRotuer.patch(
  "/type/update/:appointment_type_id",
  appointmentTypeController.updateAppointmentType
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

//time
//get all time
appointmentRotuer.get(
  "/time/all",
  AppointmentTimeController.getAppointmentTimes
);

//get one time
appointmentRotuer.get(
  "/time/:appointment_time_id",
  AppointmentTimeController.getAppointmentTime
);

//create time
appointmentRotuer.post(
  "/time/create",
  AppointmentTimeController.createAppointmentTime
);

// update time
appointmentRotuer.patch(
  "/time/update/:appointment_time_id",
  AppointmentTimeController.updateAppointmentTime
);

// delete time
appointmentRotuer.delete(
  "/time/delete/:appointment_time_id",
  AppointmentTimeController.deleteAppointmentTime
);

module.exports = appointmentRotuer;
