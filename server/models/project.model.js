const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  workers_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
  ],
  photo: {
    type: Buffer,
    required: true,
  },
  skills: [
    {
      type: String,
    },
  ],
  price: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = Project = mongoose.model("project", projectSchema);
//
