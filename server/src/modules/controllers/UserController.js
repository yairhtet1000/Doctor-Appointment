const User = require("../../model/User");
const argon2 = require("argon2");
const validator = require("validator");
const jsonwebtoken = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user", isBanned: false });
    if (!users) return res.status(404).json({ error: "There Is No User." });
    res.status(200).json({ users });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    if (!admins) return res.status(404).json({ error: "There Is No Admins." });
    res.status(200).json({ admins });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserByID = async (req, res) => {
  const { _id } = req.params;

  try {
    if (!validator.isMongoId(_id.toString()))
      return res.status(400).json({ error: "Provide Valid ID." });

    const user = await User.findById(_id);

    if (!user) return res.status(404).json({ error: "User Not Found." });

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBannedUsers = async (req, res) => {
  try {
    const bannedUsers = await User.find({ isBanned: true });
    if (!bannedUsers)
      return res.status(404).json({ error: "There Is No Banned Users." });
    res.status(200).json({ bannedUsers });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const userData = req.body;

  try {
    if (!isValidEmail(userData.email))
      return res.status(400).json({ error: "Invalid Email Format." });

    const usedEmail = await User.findOne({ email: userData.email });

    if (usedEmail)
      return res.status(400).json({ error: "This email is already in use." });

    userData.hashedPassword = await argon2.hash(userData.password);
    delete userData.password;

    const newUser = new User(userData);
    await newUser.save();
    res.status(200).json({ message: "User Register Successful.", newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const getUser = await User.findOne({ email });

    if (!getUser) return res.status(400).json({ error: "Incorrect Email." });

    const dbsPassword = getUser.hashedPassword;
    const truePassword = await argon2.verify(dbsPassword, password);

    if (!truePassword)
      return res.status(400).json({ error: "Incorrect Password." });

    const accessToken = generateToken(getUser.id, getUser.name);

    res.cookie("token", accessToken, { httpOnly: true }).status(200).json({
      message: "User Login Successful",
      getUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { _id } = req.params;
  const updatedData = req.body;

  try {
    if (!validator.isMongoId(_id.toString()))
      return res.status(400).json({ error: "Provide Valid ID." });

    if (updatedData.email && !isValidEmail(updatedData.email))
      return res.status(400).json({ error: "Invalid Email Format." });

    if (updatedData.password) {
      updatedData.hashedPassword = await argon2.hash(updatedData.password);
      delete updatedData.password;
    }

    const user = await User.findByIdAndUpdate(_id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ error: "Patient Not Found." });
    }

    res.status(200).json({ message: "User Update Successful", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const isBanned = async (req, res) => {
  const { _id } = req.params;
  const isBanned = req.body;

  try {
    const updatedData = await User.findByIdAndUpdate(_id, isBanned, {
      new: true,
      runValidators: true,
    });

    if (!updatedData) return res.status(404).json({ error: "User Not Found." });

    res.status(200).json({ message: "Successfully Banned User.", updatedData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const adminAccess = async (req, res) => {
  const { _id } = req.params;
  const role = req.body;

  try {
    const updatedData = await User.findByIdAndUpdate(_id, role, {
      new: true,
      runValidators: true,
    });

    if (!updatedData) return res.status(404).json({ error: "User Not Found." });

    res
      .status(200)
      .json({ message: "Successfully Changed User Role.", updatedData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.params;

  try {
    if (!validator.isMongoId(_id.toString()))
      return res.status(400).json({ error: "Provide Valid ID." });

    const deleteUser = await User.findByIdAndDelete(_id);

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
  getAdmins,
  getUserByID,
  getBannedUsers,
  createUser,
  userLogin,
  updateUser,
  isBanned,
  adminAccess,
  deleteUser,
};
