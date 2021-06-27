const mongoose = require('mongoose');

const ProfilePictureSchema = mongoose.Schema({
  photo: {
    type: Buffer
  },
  email:{type: String, required: true}
});


const ProfilePicture = mongoose.model("ProfilePicture", ProfilePictureSchema);

module.exports = ProfilePicture;