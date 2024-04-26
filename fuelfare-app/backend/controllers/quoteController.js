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

const viewQuoteFromID = async (req,res) => {
  try {
    console.log("User authenticated:", req.user);

    const userId = req.user._id;
    const quoteId = req.params.quoteId;
    console.log("The quote we are looking for: ", quoteId);

    const quote = await NewQuote.findOne({ user: userId, _id: quoteId });
    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }
    res.status(200).json(quote);

  } catch (error) {
    console.error("Error fetching the quote by user ID and quote ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getQuotesByUserId, viewQuoteFromID };
