const router = require("express").Router();
const authController = require("../controller/auth.controller");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/logout", authController.logout);

module.exports = router;
