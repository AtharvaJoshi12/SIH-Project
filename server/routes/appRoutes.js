const express = require("express");
const router = express.Router();
const appControllers = require("../controllers/appControllers");

router.get("/", appControllers.homepage);
router.get("/studentLogin", appControllers.studentLoginPage);
router.get("/studentRegister", appControllers.studentRegisterPage);
router.get("/parentLogin", appControllers.parentLoginPage);
router.get("/profile", appControllers.profilePage);
router.get("/editProfile", appControllers.editProfilePage);

router.post("/studentRegister", appControllers.studentRegisterAPI);
router.post("/studentLogin", appControllers.studentLoginAPI);
router.post("/editProfile", appControllers.editProfileAPI);
module.exports = router;
