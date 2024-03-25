const express = require("express");
const router = express.Router();

const signInController = require("../controllers/signInController");

router.post("/", signin);

module.exports = router;
