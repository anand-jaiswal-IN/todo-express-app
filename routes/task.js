const express = require("express");
const router = express.Router();

const taskModel = require("../models/task");

router.use((req, res, next) => {
  if (!req.session.user) {
    res.redirect("/");
  }
  next();
});

router.get("/yourTask", (req, res) => {
  async function getYourTask() {
    let tasks = await taskModel
      .find({
        ofUser: req.session.user._id,
        isFinished: { $eq: false },
      })
      .sort({ dueDateTime: -1 })
      .exec();
    console.log(tasks);

    let context = {
      pageTitle: "Your Tasks",
      tasks: tasks,
      user: req.session.user,
    };
    res.render("task/yourTask", context);
  }
  getYourTask();
});
router.get("/addTask", (req, res) => {
  let context = {
    pageTitle: "Add Tasks",
    user: req.session.user,
  };
  res.render("task/addTask", context);
});
router.post("/addTask", (req, res) => {
  async function createTask() {
    let tags = req.body.tag;
    if (tags != "") {
      if (tags.endsWith(",")) {
        tags = tags.slice(0, tags.length - 1);
      }
      tags = tags.split(",");
    } else {
      tags = [];
    }

    let [year, month, date] = req.body.dueDate.split("-");
    let [hours, minutes] = req.body.dueTime.split(":");

    let dueDateTime = new Date(+year, +month, +date, +hours, +minutes);

    let newTask = await taskModel.create({
      title: req.body.title,
      description: req.body.description,
      tags: tags,
      dueDateTime: dueDateTime,
      ofUser: req.session.user._id,
      isFinished: false,
    });
    console.log(newTask);
    req.flash(
      "successMessage",
      `Hurrah! Your task is added. Complete it fast.`
    );
    res.redirect("/task/addTask");
  }
  createTask();
});
router.get("/finish/:taskId", (req, res) => {
  async function updateTask() {
    let task = await taskModel.findOne({ _id: req.params.taskId }).exec();
    if (task == null) {
    }
    task.isFinished = true;
    task.save();
    res.redirect("/task/yourTask");
  }
  updateTask();
});
router.get("/updateTask/:taskId", (req, res) => {
  async function updateTask() {
    let task = await taskModel.findOne({ _id: req.params.taskId }).exec();
    let context = {
      pageTitle: "Update Task",
      user: req.session.user,
      task: task,
    };
    res.render("task/updateTask", context);
  }
  updateTask();
});
router.post("/updateTask/:taskId", (req, res) => {
  async function updateTask() {
    let tags = req.body.tag;
    if (tags != "") {
      if (tags.endsWith(",")) {
        tags = tags.slice(0, tags.length - 1);
      }
      tags = tags.split(",");
    } else {
      tags = [];
    }

    let [year, month, date] = req.body.dueDate.split("-");
    let [hours, minutes] = req.body.dueTime.split(":");

    let dueDateTime = new Date(+year, +month, +date, +hours, +minutes);

    let newTask = await taskModel.updateOne(
      { _id: req.params.taskId },
      {
        title: req.body.title,
        description: req.body.description,
        tags: tags,
        dueDateTime: dueDateTime,
        ofUser: req.session.user._id,
        isFinished: false,
      }
    );
    console.log(newTask);
    req.flash("successMessage", `Update Done`);
    res.redirect("/task/yourTask");
  }
  updateTask();
});
router.get("/finishedTask", (req, res) => {
  async function getFinishedTask() {
    let tasks = await taskModel
      .find({
        ofUser: req.session.user._id,
        isFinished: { $eq: true },
      })
      .exec();
    let context = {
      pageTitle: "Your Finished Task",
      user: req.session.user,
      tasks: tasks,
    };
    res.render("task/finishedTask", context);
  }
  getFinishedTask();
});
router.get("/deleteTask/:taskId", (req, res) => {
  async function deleteTask() {
    let task = await taskModel.findOne({ _id: req.params.taskId }).exec();
    await taskModel.deleteOne({ _id: req.params.taskId }).exec();
    req.flash(
      "successMessage",
      `Your one task is deleted titled as "${task.title}"`
    );
    res.redirect("/task/finishedTask");
  }
  deleteTask();
});
module.exports = router;
