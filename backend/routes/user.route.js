const express = require("express");
const {
  register,
  login,
  updateUserName,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update_name/:id").patch(auth, updateUserName);
module.exports = router;
