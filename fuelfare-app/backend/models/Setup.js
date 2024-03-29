const mongoose = require("mongoose");

const UserSetupSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, maxLength: 50 },
  password: { type: String, required: true, maxLength: 200 },
  fullName: { type: String, required: true, maxLength: 100 },
  companyName: { type: String, required: true, maxLength: 50 },
  companyAddress1: { type: String, required: true, maxLength: 100 },
  companyAddress2: { type: String, required: false, maxLength: 100 },
  city: { type: String, required: true, maxLength: 30 },
  state: { type: String, required: true, maxLength: 2 },
  country: { type: String, required: true, maxLength: 100 },
  zipCode: { type: String, required: true, maxLength: 10 },
});

const Setup = mongoose.model("Setup", UserSetupSchema);

module.exports = Setup;
