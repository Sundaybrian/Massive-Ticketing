const express = require("express");
const router = express.Router();

const queries = require("./status.queries");

router.get("/", async (req, res, next) => {
  try {
    const statuses = await queries.find();
    if (statuses.length > 0) {
      res.json(statuses);
    }
    return next();
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const status = await queries.get(parseInt(id) || 0);
    if (status) {
      res.json(status);
    }

    return next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
