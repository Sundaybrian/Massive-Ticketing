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

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const status = await queries.get(parseInt(id) || 0);
    res.json(status);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
