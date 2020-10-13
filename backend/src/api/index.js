const express = require("express");

const status = require("./meta/status/status.routes");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to ticketing app api v1 ",
  });
});

router.use("/status", status);

module.exports = router;
