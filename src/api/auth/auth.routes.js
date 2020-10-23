const express = require("express");
const router = express.Router();
const User = require("../users/users.model");
const jwt = require("../../Utils/jwt");
const bcrypt = require("bcrypt");

const { signupSchema, signinSchema } = require("./auth.validators");

router.post("/signup", signupSchema, signup);
router.post("/signin", signinSchema, signin);

module.exports = router;

async function signup(req, res, next) {
  const { fullname, email, password } = req.body;

  try {
    const existingUser = await User.query().where({ email }).first();
    if (existingUser) {
      const error = new Error("Email already in use");
      res.status(403);
      throw error;
      //TODO MAYBE SEND EMAIL TO THE OWNER OF THE EMAIL
    }

    // create account
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertedUser = await User.query()
      .insert({
        fullname,
        email,
        password: hashedPassword,
        active: true,
      })
      .returning("id", "fullname", "email", "active", "created_at");

    const payload = {
      ...insertedUser,
    };

    const token = await jwt.sign(payload);

    res.status(201).json({
      user: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
}

async function signin(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.query().where({ email }).first();
    if (
      !user ||
      !user.active ||
      !(await bcrypt.compare(password, user.password))
    ) {
      const error = new Error("Email or password is incorrect");
      res.status(403);
      throw error;
    }

    const payload = {
      id: user.id,
      fullname: user.fullname,
      email,
      created_at: user.created_at,
    };

    const token = await jwt.sign(payload);
    res.json({
      user: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
}
