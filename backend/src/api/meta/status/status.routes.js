const express = require("express");
const router = express.Router();

const queries = require("./status.queries");

router.get("/", async (req, res, next) => {
  try {
    const statuses = await queries.find();
    res.json(statuses);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
