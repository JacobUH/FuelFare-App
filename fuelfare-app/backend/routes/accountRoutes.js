const express = require("express");
const router = express.Router();

const {
  updateAccount,
  updatePassword,
} = require("../controllers/accountController");

router.put("/", updateAccount);
router.patch("/", updatePassword);

module.exports = router;
