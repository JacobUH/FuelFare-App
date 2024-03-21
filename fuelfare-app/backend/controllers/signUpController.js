const SignUp = require('../models/SignUp');
const bcrypt = require('bcrypt');

exports.signUpUser = async (req, res) => {
  const { fullName, email, password, companyName, address1, address2, city, state, country, zip } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await SignUp.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        data: [],
        message: "It seems you already have an account, please log in instead."
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new SignUp({
      fullName,
      email,
      password: hashedPassword,
      companyName,
      address1,
      address2,
      city,
      state,
      country,
      zip
    });

    // Save new user to database
    await newUser.save();

    res.status(201).json({
      status: "success",
      data: { newUser },
      message: "Account setup successful."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};
