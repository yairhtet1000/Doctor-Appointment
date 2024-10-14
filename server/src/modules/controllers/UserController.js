const User = require("../../model/User");
const argon2 = require("argon2");
const validator = require("validator");
const jsonwebtoken = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserByID = async (req, res) => {
  const { userID } = req.params;

  try {
    if (!validator.isMongoId(userID.toString()))
      return res.status(400).json({ error: "Provide Valid ID." });

    const user = await User.findById(userID);

    if (!user) return res.status(404).json({ error: "User Not Found." });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const userData = req.body;

  try {
    if (!isValidEmail(userData.email))
      return res.status(400).json({ error: "Invalid Email Format." });

    const usedEmail = await User.findOne({ email: userData.email });
    userData.hashedPassword = await argon2.hash(userData.password);

    if (usedEmail)
      return res.status(400).json({ error: "This email is already in use." });

    const user = new User(userData);
    await user.save();
    res.status(200).json({ message: "Register Successful.", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const getUser = await User.findOne({ email });
    const dbsPassword = getUser.hashedPassword;
    const truePassword = await argon2.verify(dbsPassword, password);

    if (!getUser) return res.status(400).json({ error: "Incorrect Email." });

    if (!truePassword)
      return res.status(400).json({ error: "Incorrect Password." });

    const accessToken = generateToken(getUser.id, getUser.name);

    res.cookie("token", accessToken, { httpOnly: true }).status(200).json({
      message: "Login Successful",
      getUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { userID } = req.params;
  const updatedData = req.body;

  try {
    if (!validator.isMongoId(userID.toString()))
      return res.status(400).json({ error: "Provide Valid ID." });

    if (updatedData.email && !isValidEmail(updatedData.email))
      return res.status(400).json({ error: "Invalid Email Format." });

    if (updatedData.password) {
      updatedData.hashedPassword = await argon2.hash(updatedData.password);
      delete updatedData.password;
    }

    const user = await User.findByIdAndUpdate(userID, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ error: "Patient Not Found." });
    }

    res.status(200).json({ message: "Update Successful", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const isBanned = async (req, res) => {
  const { adminID } = req.params;
  const { email, isBanned } = req.body;

  const isAdmin = await User.findById(adminID);
  if (isAdmin.role === "user" && isAdmin.role !== "admin")
    return res.status(402).json({ error: "Only Admin Can Do This Task." });

  try {
    const findUser = await User.findOne({ email });
    if (!findUser) return res.status(404).json({ error: "User Not Found." });

    await findUser.updateOne({ isBanned });

    res.status(200).json({ message: "Successful.", findUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const adminAccess = async (req, res) => {
  const { adminID } = req.params;
  const { email, role } = req.body;

  const isAdmin = await User.findById(adminID);
  if (isAdmin.role === "user" && isAdmin.role !== "admin")
    return res.status(402).json({ error: "Only Admin Can Do This Task." });

  try {
    const findUser = await User.findOne({ email });
    if (!findUser) return res.status(404).json({ error: "User Not Found." });

    await findUser.updateOne({ role });

    res.status(200).json({ message: "Successful.", findUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { userID } = req.params;

  try {
    if (!validator.isMongoId(userID.toString()))
      return res.status(400).json({ error: "Provide Valid ID." });

    const deleteUser = await User.findByIdAndDelete(userID);

    if (!deleteUser)
      return res.status(404).json({ error: "Patient Not Found." });

    res.status(200).json({ message: "Deleted Successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generateToken = (id, name) => {
  jsonwebtoken.sign({ id, name }, process.env.jwt_salt);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  userLogin,
  updateUser,
  isBanned,
  adminAccess,
  deleteUser,
};
