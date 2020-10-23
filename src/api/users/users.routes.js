const express = require("express");
const router = express.Router();
const {} = require("./users.validators");

const User = require("./users.model");
const { func } = require("joi");
const fields = ["id", "fullname", "email", "created_at", "image_url"];

// find all
router.get("/", getAllUsers);
router.get("/:user_id", getUserById);
router.patch("/:user_id");
router.delete("/:user_iid");

module.exports = router;

async function getAllUsers(req, res, next) {
  try {
    const users = await User.query()
      .select("id", "email", "fullname", "image_url", "created_at")
      .where("deleted_at", null);

    res.json(users);
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  const { user_id: id } = req.params;
  try {
    const user = await User.query().where({ id }).first().select(fields);

    if (!user) {
      const error = new Error("User not found");
      res.status(404);
      throw error;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  const { user_id: id } = req.params;

  try {
    const user = await User.query().where({ id }).first().select(fields);

    if (!user) {
      const error = new Error("User not found");
      res.status(404);
      throw error;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
}

// =============== helper functions ===================//
async function getAccount(id) {
  const account = await User.query().where({ id }).first();

  if (!account) throw "Account not found";
  return account;
}

async function hash(password) {
  return await bcrypt.hash(password, 10);
}

async function basicDetails(account) {
  const { id, fullname, email, created_at, updated_at, image_url } = account;

  return { id, fullname, email, created_at, updated_at, image_url };
}
