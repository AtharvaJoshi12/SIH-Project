require("../models/database");
const { request } = require("express");
const Register = require("../models/register");

exports.homepage = async (req, res) => {
  res.render("index");
};

exports.studentLoginPage = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");
  res.render("studentLogin", { infoErrorsObj, infoSubmitObj });
};

exports.studentRegisterPage = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");
  res.render("studentRegister", { infoErrorsObj, infoSubmitObj });
};

exports.parentLoginPage = async (req, res) => {
  res.render("parentLogin");
};

exports.profilePage = async (req, res) => {
  res.render("profile");
};

exports.studentRegisterAPI = async (req, res) => {
  try {
    const registerUser = new Register({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    const registerd = await registerUser.save();
    req.flash("infoSubmit", "Registration Successfull");
    res.status(200).redirect("studentLogin");
  } catch (error) {
    req.flash("infoErrors", `error:${error}`);
    res.status(400).redirect("studentRegister");
  }
};

exports.studentLoginAPI = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await Register.findOne({ email: email });

    if (userEmail.password === password) {
      res.status(200).render("profile");
    } else {
      res.status(400).send("Invalid Password");
    }
  } catch (error) {
    res.status(400).send("Invalid Details");
  }
};
