const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketio = require("socket.io");

require("dotenv").config();

// set up express

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;

// set up mongoose

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("mongo db connected successfully");
    else
      console.log("Error while connecting" + JSON.stringify(err, undefined, 2));
  }
);

app.use("/users", require("./routes/userRouter"));
app.use("/project", require("./routes/projectRoutes"));
app.use("/skill", require("./routes/skillRoutes"));
app.use("/rating", require("./routes/ratingRoutes"));
app.use("/projectSkills", require("./routes/projectSkillRoute"));
app.use("/userSkills", require("./routes/UserSkillRoutes"));

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
