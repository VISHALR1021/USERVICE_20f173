const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  skills: [{ type: String }],
  password: { type: String, required: true, minlength: 5 },
  description: { type: String, required: true },
  photo: {
    type: Buffer,
    required: true,
  },
});

module.exports = User = mongoose.model("user", userSchema);
