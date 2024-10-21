const { Router } = require("express");
const SpecialtiesController = require("../controllers/SpecialtiesController");

const specialtiesRouter = Router();

// get
specialtiesRouter.get("/", SpecialtiesController.getSpecialties);
specialtiesRouter.get("/:specialty_id", SpecialtiesController.getSpecialty);
specialtiesRouter.get(
  "/archive/all",
  SpecialtiesController.getArchiveSpecialties
);

// post
specialtiesRouter.post("/create", SpecialtiesController.createSpecialties);

//update
specialtiesRouter.patch(
  "/update/:specialty_id",
  SpecialtiesController.updateSpecialty
);

//save archive
specialtiesRouter.patch(
  "/archive/save/:specialty_id",
  SpecialtiesController.saveArchiveSpecialty
);

// delete
specialtiesRouter.delete(
  "/:specialty_id",
  SpecialtiesController.deleteSpecialties
);

module.exports = specialtiesRouter;
