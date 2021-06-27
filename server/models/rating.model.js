const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  worker_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: Date, default: Date.now},
});

module.exports = Rating = mongoose.model("rating", ratingSchema);
