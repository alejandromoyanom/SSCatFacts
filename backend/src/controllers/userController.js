const User = require("../models/User");

exports.registerOrLogin = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    let user = await User.findOne({ where: { username } });

    if (!user) {
      user = await User.create({ username });
      return res
        .status(201)
        .json({ message: "User registered successfully", user });
    } else {
      return res
        .status(200)
        .json({ message: "User logged in successfully", user });
    }
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Username already taken" });
    }
    console.error("Error during user registration/login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
