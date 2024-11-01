const { Router } = require("express");
const doctorAppointmentRouter = Router();
const doctorAppointmentController = require("../controllers/DoctorAppointmentController");

doctorAppointmentRouter.get(
  "/",
  doctorAppointmentController.getDoctorAppointments
);

doctorAppointmentRouter.get(
  "/archive/all",
  doctorAppointmentController.getArchiveDoctorAppointments
);

doctorAppointmentRouter.get(
  "/:doctor_appointment_id",
  doctorAppointmentController.getDoctorAppointment
);

doctorAppointmentRouter.post(
  "/create",
  doctorAppointmentController.createDoctorAppointment
);

doctorAppointmentRouter.patch(
  "/update/:doctor_appointment_id",
  doctorAppointmentController.updateDoctorAppointment
);

doctorAppointmentRouter.patch(
  "/archive/save/:doctor_appointment_id",
  doctorAppointmentController.SaveArchiveAppointment
);

doctorAppointmentRouter.delete(
  "/delete/:doctor_appointment_id",
  doctorAppointmentController.deleteDoctorAppointments
);

module.exports = doctorAppointmentRouter;
