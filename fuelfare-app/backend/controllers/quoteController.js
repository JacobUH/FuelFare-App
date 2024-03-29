const NewQuote = require("../models/newQuote");

const getQuotesByUserId = async (req, res) => {
  try {
    console.log("User authenticated:", req.user);

    const userId = req.user._id;
    const quotes = await NewQuote.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(quotes);
  } catch (error) {
    console.error("Error fetching quotes by user ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getQuotesByUserId };
