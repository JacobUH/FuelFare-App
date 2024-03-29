const express = require("express");
const router = express.Router();

const {
  updateAccount,
  updatePassword,
} = require("../controllers/accountController");

router.put("/", updateAccount);
router.put("/", updatePassword);

module.exports = router;
