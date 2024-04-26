const express = require("express");
const router = express.Router();

const { getQuotesByUserId, viewQuoteFromID } = require("../controllers/quoteController");

router.get("/", getQuotesByUserId);
router.get("/", viewQuoteFromID);

module.exports = router;
