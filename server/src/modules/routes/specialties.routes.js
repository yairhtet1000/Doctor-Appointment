const { Router } = require("express");
const SpecialtiesController = require("../controllers/SpecialtiesController");

const specialtiesRouter = Router();

// get
specialtiesRouter.get("/", SpecialtiesController.getSpecialties);
specialtiesRouter.get("/:speciality_id", SpecialtiesController.getSpecialty);

// post
specialtiesRouter.post("/create", SpecialtiesController.createSpecialties);

//update
specialtiesRouter.patch(
  "/update/:speciality_id",
  SpecialtiesController.updateSpeciality
);

// delete
specialtiesRouter.delete(
  "/:specialty_id",
  SpecialtiesController.deleteSpecialties
);

module.exports = specialtiesRouter;
