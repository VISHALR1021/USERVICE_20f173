const mongoose = require("mongoose");

const userSkillSchema = new mongoose.Schema({
  skill_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "skill",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = UserSkill = mongoose.model("userSkill", userSkillSchema);
