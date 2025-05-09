const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxLength: 20,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    maxLength: 20,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
