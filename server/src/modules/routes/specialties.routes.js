const { Router } = require("express");
const SpecialtiesController = require("../controllers/SpecialtiesController");

const specialtiesRouter = Router();

// get
specialtiesRouter.get("/", SpecialtiesController.getSpecialties);
specialtiesRouter.get("/:specialty_id", SpecialtiesController.getSpecialty);

// post
specialtiesRouter.post("/create", SpecialtiesController.createSpecialties);

//update
specialtiesRouter.patch(
  "/update/:specialty_id",
  SpecialtiesController.updateSpecialty
);

// delete
specialtiesRouter.delete(
  "/:specialty_id",
  SpecialtiesController.deleteSpecialties
);

module.exports = specialtiesRouter;
