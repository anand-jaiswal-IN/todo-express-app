const mongoose = require("mongoose");

const databaseConfig = require("./databaseConfig");
mongoose.connect(databaseConfig);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passward: String,
  gender: Number,
  dob: Date,
  bio: String,
});

const users = mongoose.model("user", userSchema);

module.exports = users;
