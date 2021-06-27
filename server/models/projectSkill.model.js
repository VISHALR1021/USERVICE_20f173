const mongoose = require("mongoose");

const projectSkillSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  },
  skill_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "skill",
  },
});

module.exports = ProjectSkill = mongoose.model(
  "projectSkill",
  projectSkillSchema
);
