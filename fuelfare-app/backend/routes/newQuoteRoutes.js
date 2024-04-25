const express = require('express');
const router = express.Router();

const { 
    newQuote,
    getQuotePrice 
} = require('../controllers/newQuoteController');

router.post("/", newQuote);
router.get("/", getQuotePrice);

module.exports = router;