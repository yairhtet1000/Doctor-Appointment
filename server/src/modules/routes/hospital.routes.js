const { Router } = require("express");
const hospitalLocationController = require("../controllers/HospitalLocationController");

const hospitalLocationRouter = Router();

// get
hospitalLocationRouter.get(
  "/",
  hospitalLocationController.getHospitalLocations
);

// get
hospitalLocationRouter.get(
  "/archive/all",
  hospitalLocationController.getArchiveHospitalLocations
);
//post
hospitalLocationRouter.post(
  "/create",
  hospitalLocationController.createHospitalLocation
);

//get by id
hospitalLocationRouter.get(
  "/:location_id",
  hospitalLocationController.getHospitalLocation
);

//update
hospitalLocationRouter.patch(
  "/update/:location_id",
  hospitalLocationController.updateHospitalLocation
);

//archive
hospitalLocationRouter.patch(
  "/archive/save/:location_id",
  hospitalLocationController.saveArchiveLocation
);

// delete
hospitalLocationRouter.delete(
  "/:location_id",
  hospitalLocationController.deleteHospitalLocation
);

module.exports = hospitalLocationRouter;
