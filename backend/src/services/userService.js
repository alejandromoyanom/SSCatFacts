const User = require("../models/User");

exports.registerOrLogin = async (username) => {
  if (!username) {
    throw new Error("Username is required");
  }

  try {
    let user = await User.findOne({ where: { username } });

    if (!user) {
      user = await User.create({ username });
      return { message: "User registered successfully", user };
    } else {
      return { message: "User logged in successfully", user };
    }
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error("Username already taken");
    }
    console.error("Error during user registration/login:", error);
    throw new Error("Internal server error");
  }
};
