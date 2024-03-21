const express = require('express');
const router = express.Router();

const signUpController = require('../controllers/signUpController');

router.post('/setup', signUpController.signUpUser);

module.exports = router;