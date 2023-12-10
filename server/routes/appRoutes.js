const express = require("express");
const router = express.Router();
const appControllers = require("../controllers/appControllers");

router.get("/", appControllers.homepage);
router.get("/studentLogin", appControllers.studentLoginPage);
router.post("/studentLogin", appControllers.studentLoginAPI);
router.get("/studentRegister", appControllers.studentRegisterPage);
router.post("/studentRegister", appControllers.studentRegisterAPI);
router.get("/parentLogin", appControllers.parentLoginPage);
router.post("/parentLogin", appControllers.parentLoginAPI);
router.get("/parentRegister", appControllers.parentRegisterPage);
router.post("/parentRegister", appControllers.parentRegisterAPI);
router.get("/profile", appControllers.profilePage);
router.get("/editProfile", appControllers.editProfilePage);
router.get("/test", appControllers.testPage);
router.get("/test/psycho", appControllers.psychoPage);
router.get("/test/aptitude", appControllers.aptitudePage);
router.get("/test/interest", appControllers.interestPage);

module.exports = router;
