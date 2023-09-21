const mongoose = require("mongoose");
const databaseConfig = require("./databaseConfig");

mongoose.connect(databaseConfig);

const taskSchema = new mongoose.Schema({
  title: String,
  description : String,
  tags : Array,
  dueDateTime : Date,
  ofUser : mongoose.ObjectId,
  isFinished: Boolean
});

const task = mongoose.model("task", taskSchema);

module.exports = task;
