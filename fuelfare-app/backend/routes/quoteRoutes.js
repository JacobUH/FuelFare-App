const express = require("express");
const router = express.Router();
const { getQuotesByUserId } = require("../controllers/quoteController");

router.get("/", getQuotesByUserId);

module.exports = router;
