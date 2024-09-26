require("dotenv").config();

const port = process.env.PORT;
const db_uri = process.env.DB_URI;

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const doctorRouter = require("./src/modules/routes/doctor.routes");
const patientRouter = require("./src/modules/routes/patient.routes");
const appointmentRouter = require("./src/modules/routes/appointment.routes");
const specialitiesRouter = require("./src/modules/routes/specialities.routes");

app.use(express.json());

app.use("/api/doctors", doctorRouter);
app.use("/api/patients", patientRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/specialities", specialitiesRouter);

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
