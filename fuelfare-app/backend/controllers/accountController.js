const Setup = require("../models/Setup");
const UserCredentials = require("../models/UserCredentials");
const bcrypt = require("bcrypt");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const fetchUserData = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is available in the request

    console.log("User ID:", userId);

    // Find the user's setup information by ID
    const userSetup = await Setup.findOne({ credentials: userId });

    console.log("User setup:", userSetup);

    // Check if the user setup information exists
    if (!userSetup) {
      return res
        .status(404)
        .json({ error: "User setup information not found" });
    }

    // Return the user setup information to the frontend
    res
      .status(200)
      .json({ message: "Account information fetched successfully", userSetup });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user data" });
  }
};

const updateAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log("User ID:", userId);

    const {
      fullName,
      companyName,
      address1,
      address2,
      city,
      state,
      country,
      zipCode,
    } = req.body;

    // Find the user's credentials by ID
    const userCredentials = await UserCredentials.findById(userId);

    console.log("User credentials found:", userCredentials);

    if (!userCredentials) {
      return res.status(404).json({ error: "User credentials not found" });
    }

    const userSetup = await Setup.findOne({ credentials: userId });

    if (!userSetup) {
      return res
        .status(404)
        .json({ error: "User setup information not found" });
    }

    userSetup.fullName = fullName;
    userSetup.companyName = companyName;
    userSetup.address1 = address1;
    userSetup.address2 = address2;
    userSetup.city = city;
    userSetup.state = state;
    userSetup.country = country;
    userSetup.zipCode = zipCode;

    await userSetup.save();

    res
      .status(200)
      .json({ message: "Account information updated successfully", userSetup });
  } catch (error) {
    console.error("Error updating account information:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating account information" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword, confNewPassword } = req.body;

    // Find the user's credentials by ID
    const userCredentials = await UserCredentials.findById(userId);

    if (!userCredentials) {
      return res.status(404).json({ error: "User credentials not found" });
    }

    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      userCredentials.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    userCredentials.password = hashedNewPassword;

    await userCredentials.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating password" });
  }
};

module.exports = { fetchUserData, updateAccount, updatePassword };
