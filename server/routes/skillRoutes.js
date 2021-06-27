const router = require("express").Router();
const Skill = require("../models/skill.model");

//*** add skills ****//
router.post("/add", async (req, res) => {
  try {
    let { skill_name } = req.body;
    const newSkill = new Skill({
      skill_name,
    });

    const savedSkill = await newSkill.save();
    res.json(savedSkill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//** get all skills to display**//
router.get("/", async (req, res) => {
  try {
    await Skill.find()
      .then((skill) => {
        res.json(skill);
      })
      .catch((err) => res.status(400).json("Error : " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//*** skill delete***//
router.route("/delete/:id").delete(async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id)
      .then(() => res.json({ msg: "Skill Deleted Successfully!" }))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
