const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("Card", cardSchema);
