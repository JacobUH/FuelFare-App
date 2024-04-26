const mongoose = require("mongoose");

const UserCredentialsSchema = new mongoose.Schema({
  email: { type: String, required: true, maxLength: 50 },
  password: { type: String, requred: true },
});

const UserCredentials = mongoose.model(
  "UserCredentials",
  UserCredentialsSchema
);

module.exports = UserCredentials;
