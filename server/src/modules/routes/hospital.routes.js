const { Router } = require("express");
const hospitalLocationController = require("../controllers/HospitalLocatonController");

const hostipalLocationRouter = Router();

// get
hostipalLocationRouter.get(
  "/",
  hospitalLocationController.getHospitalLocations
);

//post
hostipalLocationRouter.post(
  "/create",
  hospitalLocationController.createHospitalLocation
);

//get by id
hostipalLocationRouter.get(
  "/:location_id",
  hospitalLocationController.getHospitalLocation
);

//update
hostipalLocationRouter.put(
  "/update/:location_id",
  hospitalLocationController.updateHospitalLocation
);

// delete
hostipalLocationRouter.delete(
  "/:location_id",
  hospitalLocationController.deleteHospitalLocation
);

module.exports = hostipalLocationRouter;
