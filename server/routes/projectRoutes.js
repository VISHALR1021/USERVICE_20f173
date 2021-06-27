const router = require("express").Router();
const Project = require("../models/project.model");
const ProjectSkill = require("../models/projectSkill.model");
const User = require("../models/user.model");
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
      cb(new Error("only upload files with jpg or jpeg format."));
    }
    cb(undefined, true); // continue with upload
  },
});

// //*** add project ****//
router.post(
  "/add",
  upload.single("photo"),
  async (req, res) => {
    try {
      const project = new Project(req.body);
      const file = req.file.buffer;
      project.photo = file;

      await project.save();
      res.status(200).send({ msg: "add project" });
    } catch (error) {
      res.status(500).send({
        upload_error: error.message,
      });
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send({
        upload_error: error.message,
      });
    }
  }
);

//*** get project details by id ***//
router.get("/get-my-projects/:id", async (req, res) => {
  try {
    let ownerId = req.params.id;
    //with one populate this didn't work
    await Project.find({ owner_id: ownerId })
      .populate("worker_id")
      .populate("owner_id")
      .exec()
      .then((detail) => {
        res.json(detail);
      })
      .catch((err) => res.status(400).json("Error : " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//**get project photo  **//
router.get("/photo/:projectId", async (req, res) => {
  try {
    const result = await Project.findOne({
      _id: req.params.projectId,
    });
    res.set("Content-Type", "image/jpeg");
    res.send(result.photo);
  } catch (error) {
    res.status(400).send({ get_error: "Error while getting photo." });
  }
});

//**** update project details ****//
router.post("/update/:id", async (req, res) => {
  try {
    await Project.findById(req.params.id).then((project) => {
      project.seller_id = req.body.seller_id;
      project.buyer_id = req.body.buyer_id;
      project.title = req.body.title;
      project.price = req.body.price;
      project.description = req.body.description;
      project.skills = req.body.skills;
      project
        .save()
        .then(() =>
          res.status(200).json({ msg: "You've Updated the project!" })
        )
        .catch((err) => res.status(400).json({ error: err.message }));
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//*** delete project***//
router.route("/delete/:id").delete(async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
      .then(() => res.json({ msg: "Project Deleted Successfully!" }))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//*** get project details by id ***//
router.get("/get-details/:id", async (req, res) => {
  try {
    let projectId = req.params.id;
    //with one populate this didn't work
    await Project.find({ _id: projectId })
      .populate("owner_id")
      .populate("workers_ids")
      .exec()
      .then((detail) => {
        res.json(detail);
      })
      .catch((err) => res.status(400).json("Error : " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//** get all projects to display**//
router.get("/", async (req, res) => {
  try {
    //with one populate this didn't work
    await Project.find()
      .populate("owner_id")
      .populate("workers_ids")
      .exec()
      .then((project) => {
        res.json(project);
      })
      .catch((err) => res.status(400).json("Error : " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//*** get project skills by id ***//
router.get("/getProjectSkills/:id", async (req, res) => {
  try {
    let id = req.params.id;

    // await Project.find({ _id: id }, { skills: 1, _id: 0 })
    await Project.find({ _id: id })
      .exec()
      .then((project) => {
        res.json(project);
      })
      .catch((err) => res.status(400).json("Error : " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//*** get project based on skills ***//
router.get("/onSearch/:skill", async (req, res) => {
  try {
    let skill = req.params.skill;
    await Project.find({ skills: {'$regex' : skill, '$options' : 'i'}})
      .exec()
      .then((project) => {
        res.json(project);
      })
      .catch((err) => res.status(400).json("Error : " + err));
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

// ***Request for a job  ***//
router.post("/request", async (req, res) => {
  try {
    let { projectId, workers_ids } = req.body;
    let current_workers = [];

    await Project.findOne({ _id: projectId }).then((detail) => {
      current_workers = detail.workers_ids;
      if (current_workers.includes(workers_ids)) {
        res.status(200).json({ msg: "Already requested" });
      } else {
        current_workers.push(workers_ids);
        Project.updateOne(
          { _id: projectId },
          {
            $set: {
              workers_ids: current_workers,
            },
          }
        ).then((sup) => {
          res.status(200).json({ msg: "successful" });
        });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// *** check requested job or not ***//
router.post("/check-request", async (req, res) => {
  try {
    let { projectId, workers_ids } = req.body;
    let current_workers = [];

    await Project.findOne({ _id: projectId }).then((detail) => {
      current_workers = detail.workers_ids;
      if (current_workers.includes(workers_ids)) {
        res.status(200).json({ msg: "Already requested" });
      } else {
        res.status(200).json({ msg: "Not requested" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//*** get project based on id ***//
router.get("/get-applied-projects/:id", async (req, res) => {
  try {
    let id = req.params.id;

    await Project.find({ workers_ids: id })
        .exec()
        .then((project) => {
          res.status(200).json(project);
        })
        .catch((err) => res.status(400).json("Error : " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//*** get project details by skill ***//
router.get("/get-my-projects/:id", async (req, res) => {
  try {
    let ownerId = req.params.id;
    //with one populate this didn't work
    await Project.find({ owner_id: ownerId })
        .populate("worker_id")
        .populate("owner_id")
        .exec()
        .then((detail) => {
          res.json(detail);
        })
        .catch((err) => res.status(400).json("Error : " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//*** get project details by skill ***//
router.get("/getProjects/:id", async (req, res) => {
  try {
    let id = req.params.id;
    //with one populate this didn't work
    await User.find({ _id: id }, { skills: 1, _id: 0 })
        .exec()
        .then((detail) => {
          res.json(detail);
        })
        .catch((err) => res.status(400).json("Error : " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





module.exports = router;
