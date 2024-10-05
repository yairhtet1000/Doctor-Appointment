const { Router } = require("express");
const userController = require("../controllers/UserController");
const auth = require("../../middleware/auth");

const userRouter = Router();

//// routes
// get
userRouter.get("/", userController.getUsers);
userRouter.get("/:userID", userController.getUserByID);

// post
userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.userLogin);

// auth
userRouter.use(auth);

//// protected routes
// patch
userRouter.patch("/update/:userID", userController.updateUser);

// delete
userRouter.delete("/delete/:userID", userController.deleteUser);

module.exports = userRouter;
