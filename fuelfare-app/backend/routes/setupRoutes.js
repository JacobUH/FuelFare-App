const express = require("express");
const router = express.Router();

const { setup } = require("../controllers/setupController");

router.post("/", setup);

module.exports = router;
