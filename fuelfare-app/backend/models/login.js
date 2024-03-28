const mongoose = require("mongoose");

const UserLoginSchema = new mongoose.Schema({
  email: { type: String, required: true, maxLength: 50 },
  password: { type: String, requred: true, maxLength: 30 },
});

const Login = mongoose.model("Login", UserLoginSchema);

module.exports = Login;
