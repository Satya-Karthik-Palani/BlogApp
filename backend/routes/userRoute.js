const express = require("express");
const { registerUser, loginUser,logout, getuser } = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);


router.route("/getuser/:id").get(getuser)
module.exports = router;