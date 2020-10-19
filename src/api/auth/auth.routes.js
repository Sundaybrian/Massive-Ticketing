const express = require("express");
const router = express.Router();
const Joi = require("joi");
const User = require("../users/users.model");

const { signupSchema } = require("./auth.validators");

router.post("/signup", signupSchema, signup);
router.post("/signin", signinSchema, signin);

module.exports = router;

async function signup(req, res, next) {
  const { fullname, email, password, confirmPassword } = req.body;
}
