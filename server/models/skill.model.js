const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  skill_name: { type: String ,required:true},
});

module.exports = Skill = mongoose.model("skill", skillSchema);
