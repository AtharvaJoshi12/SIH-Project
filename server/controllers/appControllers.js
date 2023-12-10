require("../models/database");
const { request } = require("express");
const Register = require("../models/register");
const Parent = require("../models/parent");
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
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");
  res.render("parentLogin", { infoErrorsObj, infoSubmitObj });
};

exports.parentRegisterPage = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");
  res.render("parentRegister", { infoErrorsObj, infoSubmitObj });
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

exports.studentRegisterAPI = async (req, res) => {
  try {
    const registerUser = new Register({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    const registered = await registerUser.save();
    req.flash("infoSubmit", "Registration Successful");
    res.status(200).redirect("/studentLogin");
  } catch (error) {
    req.flash("infoErrors", `Error: ${error.message}`);
    res.status(400).redirect("/studentRegister");
  }
};

exports.studentLoginAPI = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await Register.findOne({ email: email });

    if (userEmail && userEmail.password === password)
      res.status(200).render("profile");

    if (userEmail.password === password) {
      res.status(200).render("");
    } else {
      res.status(400).send("Invalid Password");
    }
  } catch (error) {
    res.status(400).send("Invalid Details");
  }
};

exports.parentRegisterAPI = async (req, res) => {
  const studentEmail = req.body.studentEmail;
  const studentPassword = req.body.studentPassword;

  try {
    const studentExists = await Register.findOne({
      email: studentEmail,
      password: studentPassword,
    });

    if (studentExists) {
      const parentExists = await Parent.findOne({
        email: req.body.parentEmail,
      });

      if (!parentExists) {
        const registerParent = new Parent({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.parentEmail,
          studentEmail: studentEmail,
          studentPassword: studentPassword,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
        });

        const registered = await registerParent.save();
        req.flash("infoSubmit", "Parent Registration Successful");
        res.status(200).redirect("/parentLogin");
      } else {
        req.flash("infoErrors", "Parent with this email already exists");
        res.status(400).redirect("/parentRegister");
      }
    } else {
      req.flash("infoErrors", "Invalid Student Email or Password");
      res.status(400).redirect("/parentRegister");
    }
  } catch (error) {
    req.flash("infoErrors", `Error: ${error.message}`);
    res.status(400).redirect("/parentRegister");
  }
};

exports.parentLoginAPI = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const parentEmail = await Parent.findOne({ email: email });

    if (parentEmail && parentEmail.password === password) {
      res.status(200).render("profile");
    } else {
      res.status(400).send("Invalid Password");
    }
  } catch (error) {
    res.status(400).send("Invalid Details");
  }
};

// exports.studentLoginAPI = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;

//     const user = await Register.findOne({ email: email });

//     if (user && user.password === password) {
//       // Assuming user has a profile associated with them
//       const userProfile = await Profile.findOne({ email: email });

//       // Render the profile page with user profile data
//       res.status(200).render("profile", { userProfile });
//     } else {
//       res.status(400).send("Invalid Password");
//     }
//   } catch (error) {
//     res.status(400).send("Invalid Details");
//   }
// };

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
