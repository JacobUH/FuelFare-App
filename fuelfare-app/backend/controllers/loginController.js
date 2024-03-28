const Login = require("../models/login");

const login = async (req, res) => {
  try {
    // Validate Login
    res.status(201).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { login };