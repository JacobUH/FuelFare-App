const Setup = require("../models/Setup");
const bcrypt = require("bcrypt");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const updateAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      fullName,
      companyName,
      address1,
      address2,
      city,
      state,
      country,
      zip,
    } = req.body;

    // Find the user's account by ID
    const user = await Setup.findById(userId);

    user.fullName = fullName;
    user.companyName = companyName;
    user.address1 = address1;
    user.address2 = address2;
    user.city = city;
    user.state = state;
    user.country = country;
    user.zip = zip;

    await user.save();

    res
      .status(200)
      .json({ message: "Account information updated successfully", user });
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

    // Find the user's account by ID
    const user = await Setup.findById(userId);

    // Compare the provided current password with the password stored in the database
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Hash and update the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating password" });
  }
};

module.exports = { updateAccount, updatePassword };
