const express = require("express");
const router = express.Router();
const User = require("../users/users.model");
const Auth = require("./auth.model");
const jwt = require("../../Utils/jwt");

const { signupSchema, signinSchema } = require("./auth.validators");

router.post("/signup", signupSchema, signup);
router.post("/signin", signinSchema, signin);

module.exports = router;

async function signup(req, res, next) {
  const { fullname, email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.query().where({ email }).first();
    if (existingUser) {
      console.log(existingUser);
      const error = new Error("Email already in use");
      res.status(403);
      throw error;
      //TODO MAYBE SEND EMAIL TO THE OWNER OF THE EMAIL
    }

    // create account
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertedUser = await User.query().insert({
      fullname,
      email,
    });

    // insert user to auth table
    const authUser = await Auth.query().insert({
      user_id: insertedUser.id,
      hashedPassword,
      active: true,
    });

    const payload = {
      ...insertedUser,
    };

    const token = await jwt.sign(payload);

    res.status(201).json({
      user: payload,
      token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function signin(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.query().where({ email }).first();
    if (!user) {
      const error = new Error("Email already in use");
      res.status(403);
      throw error;
    }

    const authUser = await Auth.query().where({ user_id: user.id }).first();

    const validPassword = await bcrypt.compare(password, authUser.password);

    if (!validPassword) {
      const error = new Error("Invalid login credentials");
      res.status(403);
      throw error;
    }

    const payload = {
      id: user.id,
      fullname: user.name,
      email,
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
