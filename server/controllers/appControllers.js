require("../models/database");
const { request } = require("express");
const Register = require("../models/register");
const Profile = require("../models/profile");
const path = require("path");

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

exports.editProfilePage = async (req, res) => {
  res.render("editProfile");
};

exports.testPage = async (req, res) => {
  const htmlFilePath = path.join(__dirname, "../../public/test/test.html");
  res.sendFile(htmlFilePath);
};

exports.psychoPage = async (req, res) => {
  const htmlFilePath = path.join(__dirname, "../../public/test/psycho.html");
  res.sendFile(htmlFilePath);
};

exports.aptitudePage = async (req, res) => {
  const htmlFilePath = path.join(__dirname, "../../public/test/aptitude.html");
  res.sendFile(htmlFilePath);
};

exports.interestPage = async (req, res) => {
  const htmlFilePath = path.join(__dirname, "../../public/test/interest.html");
  res.sendFile(htmlFilePath);
};

exports.resultPage = async (req, res) => {
  const htmlFilePath = path.join(__dirname, "../../public/test/result.html");
  res.sendFile(htmlFilePath);
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
      res.status(200).render("");
    } else {
      res.status(400).send("Invalid Password");
    }
  } catch (error) {
    res.status(400).send("Invalid Details");
  }
};

exports.editProfileAPI = async (req, res) => {
  try {
    const createProfile = new Profile({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      educationBoard: req.body.educationBoard,
      parentEmail: req.body.parentEmail,
      parentNumber: req.body.parentNumber,
      familyIncome: req.body.familyIncome,
      address: req.body.address,
    });

    const createdProfile = await createProfile.save();
    req.flash("infoSubmit", "Profile Created Successfully");
    res.status(200).redirect("profile");
  } catch (error) {
    req.flash("infoErrors", `error:${error}`);
    res.status(400).redirect("editProfile");
  }
};
