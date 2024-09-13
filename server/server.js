require("dotenv").config();

const port = process.env.PORT;
const db_uri = process.env.DB_URI;

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const docRouter = require("./src/routes/router");

app.use(express.json());

app.use("/api", docRouter);

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
