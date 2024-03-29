const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const { login } = require("../controllers/loginController");

router.post("/login", login);

router.get("/", authenticateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
