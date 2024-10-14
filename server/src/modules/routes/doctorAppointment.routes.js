const { Router } = require("express");
const doctorAppointmentRotuer = Router();
const doctorAppointmentController = require("../controllers/DoctorAppointmentController");

doctorAppointmentRotuer.get(
  "/",
  doctorAppointmentController.getDoctorAppointments
);

doctorAppointmentRotuer.get(
  "/:doctor_appointment_id",
  doctorAppointmentController.getDoctorAppointment
);

doctorAppointmentRotuer.post(
  "/create",
  doctorAppointmentController.createDoctorAppointment
);

doctorAppointmentRotuer.patch(
  "/update/:doctor_appointment_id",
  doctorAppointmentController.updateDoctorAppointment
);

doctorAppointmentRotuer.delete(
  "/delete/:doctor_appointment_id",
  doctorAppointmentController.deleteDoctorAppointments
);

module.exports = doctorAppointmentRotuer;
