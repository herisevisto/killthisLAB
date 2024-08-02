const router = require("express").Router();
const authController = require("../auth.controller");

router.post("/login", authController.login);
router.post("/loginlabtech", authController.loginlabtech);
router.post("/register", authController.register);
router.get("/logout", authController.logout);
router.post("/change-password", authController.changePassword);
module.exports = router;
