const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserCredentials = require("../models/UserCredentials");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Req Body:", req.body);

  try {
    // Check if the user exists
    const user = await UserCredentials.findOne({ email });

    console.log("User found:", user);

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      console.log("Password does not match");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: "365d",
    });

    console.log("JWT token generated:", token);

    res.json({ userId: user._id, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { login };
