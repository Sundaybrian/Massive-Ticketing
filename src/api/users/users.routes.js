const express = require("express");
const router = express.Router();

const User = require("./users.model");

// find all
router.get("/", async (req, res, next) => {
  try {
    const users = await User.query();

    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
