const { Router } = require("express");
const userController = require("../controllers/UserController");
const auth = require("../../middleware/auth");

const userRouter = Router();

//// routes
// get
userRouter.get("/", userController.getUsers);
userRouter.get("/admins", userController.getAdmins);
userRouter.get("/bannedUsers", userController.getBannedUsers);
userRouter.get("/:_id", userController.getUserByID);

// post
userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.userLogin);

// auth
// userRouter.use(auth);

//// protected routes
// patch
userRouter.patch("/update/:_id", userController.updateUser);
userRouter.patch("/ban/:_id", userController.isBanned);
userRouter.patch("/role/:_id", userController.adminAccess);

// delete
userRouter.delete("/delete/:_id", userController.deleteUser);

module.exports = userRouter;
