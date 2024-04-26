const NewQuote = require("../models/newQuote");
const Setup = require("../models/Setup");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const newQuote = async (req, res) => {
  try {
    // Create a new quote
    const newQuote = new NewQuote(req.body);
    await newQuote.save();
    res.status(201).json({ message: "User created a new quote successfully", _id: newQuote._id });
  } catch (error) {
    console.error("Error creating new quote:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getQuotePrice = async (req, res) => {
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

    const userState = userSetup.state;

    const countQuote = await NewQuote.countDocuments({ user: userId });

    res
      .status(200)
      .json({ message: "Quote information fetched successfully", userState, countQuote });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user data" });
  }
};

module.exports = { newQuote, getQuotePrice };
