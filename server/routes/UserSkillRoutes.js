const router = require("express").Router();
const UserSkill = require("../models/userSkill.model");

router.route("/add").post(function (req, res) {
  let userSkill = new UserSkill(req.body);

  UserSkill.find({ user_id: req.body.user_id, skill_id: req.body.skill_id })
    .exec()
    .then((item) => {
      if (item.length >= 1) {
        res.status(500).json({ userSkill: "userSkill Available" });
      } else {
        userSkill
          .save()
          .then((sup) => {
            res.status(200).send("Success");
          })
          .catch((err) => {
            res.status(400).send("fail");
          });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.route("/getAll").get(function (req, res) {
  //with one populate this didn't work
  UserSkill.find()
    .populate("user_id")
    .populate("skill_id")
    .exec()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.route("/getProjectSkill/:id").get(function (req, res) {
  let id = req.params.id;
  //with one populate this didn't work
  UserSkill.findOne({ user_id: id })
    .populate("user_id")
    .populate("skill_id")
    .exec()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  try {
    await UserSkill.findByIdAndDelete(req.params.id)
      .then(() => res.json({ msg: "Project Deleted Successfully!" }))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
