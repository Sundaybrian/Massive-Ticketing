const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { updateSchema } = require("./users.validators");

const User = require("./users.model");

// find all
router.get("/", getAllUsers);
router.get("/:user_id", getUserById);
router.patch("/:user_id", updateSchema, updateUser);
router.delete("/:user_id");

module.exports = router;

async function getAllUsers(req, res, next) {
  try {
    const users = await getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  const { user_id: id } = req.params;
  try {
    const user = await getAccount(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  const { user_id: id } = req.params;

  try {
    const user = await update(id, req.body);

    res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// =============== helper functions ===================//
async function getAccount(id) {
  const account = await User.query().where({ id }).first();

  if (!account) throw "Account not found";
  return account;
}

async function getAll() {
  const accounts = await User.query().where("deleted_at", null);
  return accounts.map((x) => basicDetails(x));
}

async function update(id, params) {
  const account = await getAccount(id);

  // validate if email was changed
  if (
    params.email &&
    account.email !== params.email &&
    (await User.query().where({ email: params.email }).first())
  ) {
    throw 'Email "' + params.email + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
    params.password = await hash(params.password);
  }

  await account.$query().patchAndFetch({ ...params });
}

async function hash(password) {
  return await bcrypt.hash(password, 10);
}

async function basicDetails(account) {
  const { id, fullname, email, created_at, updated_at, image_url } = account;
  return { id, fullname, email, created_at, updated_at, image_url };
}
