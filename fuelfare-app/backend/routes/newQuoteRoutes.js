const express = require('express');
const router = express.Router();

const { newQuote } = require('../controllers/newQuoteController');

router.post("/", newQuote);

module.exports = router;