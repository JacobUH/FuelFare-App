const express = require("express");
const router = express.Router();

const { signUp } = require("../controllers/signUpController");

router.post("/", signUp);

module.exports = router;
