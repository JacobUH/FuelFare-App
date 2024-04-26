const express = require("express");
const router = express.Router();

const {
  fetchUserData,
  updateAccount,
  updatePassword,
} = require("../controllers/accountController");

router.get("/", fetchUserData);
router.put("/", updateAccount);
router.patch("/", updatePassword);

module.exports = router;
