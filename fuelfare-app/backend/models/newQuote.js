const mongoose = require("mongoose");

const fuelTypeOptions = ["regular", "mid", "premium", "diesel"];
const fixedPricePerGallon = 1.50; 

const QuoteSchema = new mongoose.Schema({
  numOfGallons: { type: Number, required: true, max: 50 },
  fuelType: { type: String, required: true, enum: fuelTypeOptions },
  pricePerGallon: { type: Number, required: true, default: fixedPricePerGallon },
  companyAddress1: { type: String, required: true, max: 100 },
  deliveryDate: { type: Date, required: true },
});

const NewQuote = mongoose.model("NewQuote", QuoteSchema);

module.exports = NewQuote;