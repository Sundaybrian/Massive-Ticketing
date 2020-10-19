const express = require("express");
const router = express.Router();
const User = require("../users/users.model");

const { signupSchema } = require("./auth.validators");

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
    const insertedUser = await User.query().insert({
      fullname,
      email,
    });

    // TODO insert to auth table too
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
