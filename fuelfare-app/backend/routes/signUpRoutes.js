const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/signUpController");

router.post("/", signup);

module.exports = router;
