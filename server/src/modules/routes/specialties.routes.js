const { Router } = require("express");
const SpecialtiesController = require("../controllers/SpecialtiesController");

const specialtiesRouter = Router();

// get
specialtiesRouter.get("/", SpecialtiesController.getSpecialties);

// post
specialtiesRouter.post("/create", SpecialtiesController.createSpecialties);

// delete
specialtiesRouter.delete(
  "/:specialty_id",
  SpecialtiesController.deleteSpecialties
);

module.exports = specialtiesRouter;
