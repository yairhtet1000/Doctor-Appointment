const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
    isBanned: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.hashedPassword;
    delete ret.__v;
    return ret;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
