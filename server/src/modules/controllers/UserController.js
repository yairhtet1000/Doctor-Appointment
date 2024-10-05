const User = require("../../model/User");
const argon2 = require("argon2");
const validator = require("validator");
const jsonwebtoken = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-hashedPassword");
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

    const user = await User.findById(userID).select("-hashedPassword");

    if (!user) return res.status(404).json({ error: "User Not Found." });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { name, email, phone, password, banned } = req.body;

  try {
    if (!isValidEmail(email))
      return res.status(400).json({ error: "Invalid Email Format." });

    const usedEmail = await User.findOne({ email });
    const hashedPassword = await argon2.hash(password);

    if (usedEmail)
      return res.status(400).json({ error: "This email is already in use." });

    const user = new User({ name, email, phone, hashedPassword, banned });
    await user.save();
    res.status(200).json(user);
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

    const accessToken = jsonwebtoken.sign(
      {
        _id: getUser.id,
        name: getUser.name,
      },
      process.env.jwt_salt
    );

    // const showUser = getUser.select("-hashedPassword");

    res.status(200).json({
      message: "Login Successful",
      getUser,
      accessToken,
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

    const user = await User.findByIdAndUpdate(userID, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ error: "Patient Not Found." });
    }

    // const showUser = user.select("-hashedPassword");

    res.status(200).json(user);
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
  deleteUser,
};
