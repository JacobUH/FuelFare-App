const mongoose = require("mongoose");

const UserSignInSchema = new mongoose.Schema({
  email: { type: String, required: true, maxLength: 50 },
  password: { type: String, requred: true, maxLength: 30 },
});

const SignIn = mongoose.model("SignIn", UserSignInSchema);

module.exports = SignIn;
