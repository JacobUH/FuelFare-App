const express = require('express');
const router = express.Router();

const { 
    viewQuoteFromID,
} = require('../controllers/newQuoteController');

router.get("/", viewQuoteFromID);

module.exports = router;