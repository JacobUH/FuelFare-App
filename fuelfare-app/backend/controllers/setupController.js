const Setup = require("../models/Setup");
const UserCredentials = require("../models/UserCredentials");

const setup = async (req, res) => {
  try {
    const { email, ...otherFormData } = req.body;

    // Find user credentials by email
    const userCredentials = await UserCredentials.findOne({ email });
    if (!userCredentials) {
      return res.status(400).json({ error: "User credentials not found" });
    }

    // Create user information document with associated credentials
    const newUserSetup = new Setup({
      credentials: userCredentials._id,
      ...otherFormData,
    });

    await newUserSetup.save();

    res.status(201).json({ message: "User information saved successfully" });
  } catch (error) {
    console.error("Error setting up user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { setup };
