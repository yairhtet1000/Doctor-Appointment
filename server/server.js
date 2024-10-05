require("dotenv").config();

const port = process.env.PORT;
const db_uri = process.env.DB_URI;

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const doctorRouter = require("./src/modules/routes/doctor.routes");
const patientRouter = require("./src/modules/routes/patient.routes");
const appointmentRouter = require("./src/modules/routes/appointment.routes");
const specialtiesRouter = require("./src/modules/routes/specialties.routes");
const hostipalLocationRouter = require("./src/modules/routes/hospital.routes");

app.use(express.json());
app.use(cors());

app.use("/api/doctors", doctorRouter);
app.use("/api/patients", patientRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/specialties", specialtiesRouter);
app.use("/api/hospital/location", hostipalLocationRouter);

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
