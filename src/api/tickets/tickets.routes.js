const express = require("express");

const { createSchema } = require("./tickets.validators");
const Ticket = require("./tickets.model");
const TicketHistory = require("./ticketHistory/ticketHistory.model");

const router = express.Router({
    mergeParams: true,
});

// api/v1/tickets/1/ticket-history
router.use("/:ticket_id/ticketHistory", TicketHistory);

module.exports = router;
