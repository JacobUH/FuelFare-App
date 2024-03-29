const Setup = require("../models/Setup");
const bcrypt = require("bcrypt");

const setup = async (req, res) => {
  try {
    const { email, password, ...otherFormData } = req.body;

    const existingUser = await Setup.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email already exists in the database" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Setup({
      email,
      password: hashedPassword,
      ...otherFormData,
    });
    await newUser.save();

    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { setup };
