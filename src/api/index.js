const express = require("express");

const status = require("./meta/status/status.routes");
const users = require("./users/users.routes");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Welcome to ticketing app api v1 ",
    });
});

router.use("/status", status);
router.use("/users", users);
router.use("/auth", require("./auth/auth.routes"));
router.use("/department", require("./department/department.routes"));
router.use("/ticket-types", require("./ticketType/ticketType.routes"));
router.use("/tickets", require("./tickets/tickets.routes"));

module.exports = router;
