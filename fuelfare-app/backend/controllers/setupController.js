const Setup = require("../models/Setup");

const setup = async (req, res) => {
  try {
    // Create a new user
    const newUser = new Setup(req.body);
    await newUser.save();
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { setup };
