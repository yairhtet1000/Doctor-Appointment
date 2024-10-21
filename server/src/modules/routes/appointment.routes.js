const { Router } = require("express");
const appointmentRouter = Router();
const appointmentController = require("../controllers/AppointmentController");
const appointmentTypeController = require("../controllers/AppointmentTypeController");
const AppointmentTimeController = require("../controllers/AppointmentTimeController");

// appointment schema
//get
appointmentRouter.get("/", appointmentController.getAppointments);
appointmentRouter.get("/:appointment_id", appointmentController.getAppointment);
appointmentRouter.get(
  "/archive/all",
  appointmentController.getArchiveAppointments
);

//post
appointmentRouter.post("/create", appointmentController.createAppointment);

//update
appointmentRouter.patch(
  "/update/:appointment_id",
  appointmentController.updateAppointment
);

//save archive
appointmentRouter.patch(
  "/archive/save/:appointment_id",
  appointmentController.SaveArchiveAppointment
);

//delete
appointmentRouter.delete(
  "/:appointment_id",
  appointmentController.deleteAppointments
);

//appointment type schema
//get
appointmentRouter.get(
  "/types/all",
  appointmentTypeController.getAppointmentTypes
);

//archive
appointmentRouter.get(
  "/types/archive/all",
  appointmentTypeController.getArchiveAppointmentTypes
);
appointmentRouter.get(
  "/type/:appointment_type_id",
  appointmentTypeController.getAppointmentType
);
//update
appointmentRouter.patch(
  "/type/update/:appointment_type_id",
  appointmentTypeController.updateAppointmentType
);
//save archive
appointmentRouter.patch(
  "/type/archive/save/:appointment_type_id",
  appointmentTypeController.saveArchiveAppointmentType
);

//create
appointmentRouter.post(
  "/type/create",
  appointmentTypeController.createAppointmentType
);

appointmentRouter.delete(
  "/type/delete/:appointment_type_id",
  appointmentTypeController.deleteAppointmentType
);

// appointment time schema
//get all time
appointmentRouter.get(
  "/time/all",
  AppointmentTimeController.getAppointmentTimes
);
//get archive
appointmentRouter.get(
  "/time/archive/all",
  AppointmentTimeController.getArchiveAppointmentTimes
);
//get one time
appointmentRouter.get(
  "/time/:appointment_time_id",
  AppointmentTimeController.getAppointmentTime
);

//create time
appointmentRouter.post(
  "/time/create",
  AppointmentTimeController.createAppointmentTime
);

// update time
appointmentRouter.patch(
  "/time/update/:appointment_time_id",
  AppointmentTimeController.updateAppointmentTime
);
//save archive
appointmentRouter.patch(
  "/time/archive/save/:appointment_time_id",
  AppointmentTimeController.saveArchiveAppointmentTime
);

// delete time
appointmentRouter.delete(
  "/time/delete/:appointment_time_id",
  AppointmentTimeController.deleteAppointmentTime
);

module.exports = appointmentRouter;
