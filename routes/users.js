const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

const usersModel = require("../models/users");

router.get("/login", (req, res) => {
  if (!req.session.user) {
    res.render("users/login", { pageTitle: "Login Here" });
  } else {
    res.redirect("/");
  }
});
router.post("/login", (req, res) => {
  async function findUser() {
    const user = await usersModel.findOne({ email: req.body.email }).exec();

    if (user == null) {
      req.flash("errorMessage", "No user exist, create account!!!");
      res.redirect("/users/login");
    } else {
      let isCorrectPassward = await bcrypt.compare(
        req.body.passward,
        user.passward
      );

      if (!isCorrectPassward) {
        req.flash("errorMessage", "passward is wrong!!!");
        res.redirect("/users/login");
      } else {
        req.session.user = user;
        req.flash("successMessage", "Logged in successfully");
        res.redirect("/");
      }
    }
  }
  findUser();
});
router.get("/signup", (req, res) => {
  if (!req.session.user) {
    res.render("users/signup", { pageTitle: "SignUp Here" });
  } else {
    res.redirect("/");
  }
});
router.post("/signup", (req, res) => {
  async function createUser() {
    let user = await usersModel.findOne({ email: req.body.email }).exec();
    if (user == null) {
      let hashedPassward = await bcrypt.hash(req.body.passward, 10);
      await usersModel.create({
        name: req.body.fullname,
        email: req.body.email,
        passward: hashedPassward,
        gender: +req.body.gender,
        dob: new Date(),
        bio: req.body.bio,
      });
      req.flash(
        "successMessage",
        `Your account has been created with "${req.body.email}" email`
      );
      res.redirect("/users/login");
    } else {
      req.flash(
        "errorMessage",
        `Account is already exist with "${req.body.email}" email`
      );
      res.redirect("/users/signup");
    }
  }
  createUser();
});
router.get("/logout", (req, res) => {
  if (!req.session.user) {
    res.redirect("/");
  } else {
    //deleting user data from session
    delete req.session.user; 
    req.flash("successMessage", "Logout successfully !!!");
    res.redirect("/users/login");
  }
});

module.exports = router;
