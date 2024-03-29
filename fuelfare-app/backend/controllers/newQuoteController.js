const NewQuote = require("../models/newQuote");

const newQuote = async (req, res) => {
  try {
    // Create a new quote
    const newQuote = new NewQuote(req.body);
    await newQuote.save();
    res.status(201).json({ message: "User created a new quote successfully" });
  } catch (error) {
    console.error("Error creating new quote:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { newQuote };
