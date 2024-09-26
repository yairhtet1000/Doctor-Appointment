const { Router } = require("express");
const SpecialitiesController = require("../controllers/SpecialitiesController");

const specialitiesRouter = Router();

// get
specialitiesRouter.get("/", SpecialitiesController.getSpecialities);

// post
specialitiesRouter.post("/c", SpecialitiesController.createSpecialities);

// delete
specialitiesRouter.delete(
  "/:speciality_id",
  SpecialitiesController.deleteSpecialities
);

module.exports = specialitiesRouter;
