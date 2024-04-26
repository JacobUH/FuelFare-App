const mongoose = require("mongoose");

const fuelTypeOptions = ["regular", "mid", "premium", "diesel"];
const fixedPricePerGallon = 1.5;

const QuoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Setup", required: true },
  numGallons: { type: Number, required: true, max: 1000000000 },
  totalPrice: { type: Number, required: true, max: 1000000000 },
  fuelType: { type: String, required: true, enum: fuelTypeOptions },
  pricePerGallon: { type: Number, required: true, default: fixedPricePerGallon },
  address: { type: String, required: true, max: 100 },
  deliveryDate: { type: String, required: true },
});

const NewQuote = mongoose.model("NewQuote", QuoteSchema);

module.exports = NewQuote;
