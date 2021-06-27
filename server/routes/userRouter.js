const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user.model");
const multer = require("multer");
const ProfilePicture = require("../models/Photo.model");
const Project = require("../models/project.model");
let nodemailer = require("nodemailer");

const YourEmail="uservice.authentication@gmail.com";
const YourEmailPassword = "Iphone6s+";


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

//*** Email ***//
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: YourEmail,
    pass: YourEmailPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//*** User Authentication ***//

router.get("/sendMail/:email", function (req, res) {
  let receiverEmail = req.params.email;
  console.log(receiverEmail);

  let code = Math.floor(Math.random() * 10000 + 1);
  var mailOptions = {
    from: YourEmail,
    to: receiverEmail,
    subject: "USERVICE Email Verification",
    html:
      "<h1>Welcome to UserVice Authentication Service</h1><p>Please use this verification code to signup <i>" +
      code +
      "</i>  for signup to Project Management Application." +
      "</p><br/><br/><p><strong>Please Contact Us for Futher Details: uservice.authentication@gmail.com</strong></p>",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400).send({msg: "Mail Sent error:"+error.message});
    } else {
      res.status(200).json({ code: code,msg:"Please check you email" });
    }
  });
});

//** User Registration**//
router.post("/register", upload.single("photo"), async (req, res) => {
  try {
    let { name, email, password, skills, passwordCheck, description } =
      req.body;
    if (
      !name ||
      !email ||
      !password ||
      !passwordCheck ||
      skills.length === 0 ||
      !description
    )
      return res.status(400).json({ msg: "Not all fields have been entered." });

    if (req.file.buffer === undefined)
      return res.status(400).json({ msg: "Please Upload a photo" });

    if (password.length < 5)
      return res.status(400).json({
        msg: "The password needs to be at least 5 characters long.",
      });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      skills,
      name,
      description,
    });

    const file = req.file.buffer;
    newUser.photo = file;

    const savedUser = await newUser.save();
    if (savedUser)
      return res.status(200).json({ msg: "Successfully Registered" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/photo/:id", async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params.id });
    res.set("Content-Type", "image/jpeg");
    res.send(result.photo);
  } catch (error) {
    res.status(400).send({ get_error: "Error while getting photo." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    let user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//***delete account***//
router.delete("/delete/:id", async (req, res) => {
  try {
    Project.deleteMany({ owner_id: req.params.id });
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  let user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});

//**** update account details ****//
router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.name = req.body.name;
      user.description = req.body.description;
      user.skills = req.body.skills;
      user
        .save()
        .then(() => res.json("Detail updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/update/:id").post(function (req, res) {
//   let user = new User(req.body);
//   user
//     .updateOne(
//       { _id: req.params.id },
//       {
//         $set: {
//           name: user.name,
//           //profilePic: user.profilePic,
//           description: user.description,
//           skills: user.skills,
//         },
//       }
//     )
//     .then((sup) => {
//       res.status(200).json({ userUpdate: "successful" });
//     })
//     .catch((err) => {
//       res.status(400).send("User Update Failed!");
//     });
// });

router.route("/passwordReset/:email/:password").get(function (req, res) {
  let email = req.params.email;
  let password = req.params.password;
  User.find({ email: email })
    .exec()
    .then((item) => {
      if (!item == "") {
        User.updateOne({ email: email }, { $set: { password: password } })
          .then((sup) => {
            res.status(200).json({ passwordReset: "successful" });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        res.status(404).json({ message: "Email not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.route("/getDetails").get(function (req, res) {
  User.find({})
    .exec()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//*** get user by id ***//
router.get("/get-user/:id", async (req, res) => {
  try {
    let id = req.params.id;

    await User.find({ _id: id })
      .exec()
      .then((user) => {
        res.json(user);
      })
      .catch((err) => res.status(400).json("Error : " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//*** get user skills by id ***//
router.get("/getSkills/:id", async (req, res) => {
  try {
    let id = req.params.id;

    await User.find({ _id: id }, { skills: 1, _id: 0 })
      .exec()
      .then((user) => {
        res.json(user);
      })
      .catch((err) => res.status(400).json("Error : " + err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
