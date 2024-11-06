require("dotenv").config();

const port = process.env.PORT;
const db_uri = process.env.DB_URI;

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const doctorRouter = require("./src/modules/routes/doctor.routes");
const userRouter = require("./src/modules/routes/user.routes");
const appointmentRouter = require("./src/modules/routes/appointment.routes");
const specialtiesRouter = require("./src/modules/routes/specialties.routes");
const hospitalLocationRouter = require("./src/modules/routes/hospital.routes");
const doctorAppointmentRouter = require("./src/modules/routes/doctorAppointment.routes");

app.use(express.json());
app.use(cors());

app.use("/api/doctors", doctorRouter);
app.use("/api/users", userRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/specialties", specialtiesRouter);
app.use("/api/hospital/location", hospitalLocationRouter);
app.use("/api/doctorAppointments", doctorAppointmentRouter);

mongoose
  .connect(db_uri)
  .then(() => {
    app.listen(port, () => {
      console.log(
        `server is starting at port ${port} and mongodb is connected`
      );
    });
  })
  .catch((err) => console.log(err));
