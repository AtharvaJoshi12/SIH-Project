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

<<<<<<< HEAD
module.exports = router;
=======
router.post("/studentRegister", appControllers.studentRegisterAPI);
router.post("/studentLogin", appControllers.studentLoginAPI);
router.post("/editProfile", appControllers.editProfileAPI);
module.exports = router;
>>>>>>> f7d70efe2416120dcd01189b59ae69a8bb3c7e74
