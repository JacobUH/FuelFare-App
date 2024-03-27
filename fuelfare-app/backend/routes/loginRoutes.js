const express = require("express");
const router = express.Router();

const signInController = require("../controllers/loginController");

router.post("/", login);

module.exports = router;
