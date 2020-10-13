const express = require("express");

const status = require("./meta/status/status.routes");

const router = express.Router();
router.use("/status", status);

module.exports = router;
