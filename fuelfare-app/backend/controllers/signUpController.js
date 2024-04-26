const UserCredentials = require("../models/UserCredentials");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await UserCredentials.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user credentials document
    const newUser = new UserCredentials({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signUp };
