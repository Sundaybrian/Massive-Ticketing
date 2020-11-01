const express = require("express");

const auth = require("../../_middlewares/auth");
const { createSchema } = require("./tickets.validators");
const Ticket = require("./tickets.model");
const TicketHistory = require("./ticketHistory/ticketHistory.routes");

const router = express.Router({
    mergeParams: true,
});

// api/v1/tickets/1/ticket-history
router.use("/:ticket_id/ticketHistory", TicketHistory);

router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.post("/", auth, createSchema, createTicket);
router.delete("/:id", deleteOne);

async function getAllTickets(req, res, next) {
    try {
        const tickets = await Ticket.query().where("deleted_at", null);
        res.json(tickets);
    } catch (error) {
        next(error);
    }
}

// TODO owner, admin or agent middleware
async function getTicketById(req, res, next) {
    const { id } = req.params;
    try {
        const ticket = await Ticket.query().where({
            deleted_at: null,
            id,
        });

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.json(ticket);
    } catch (error) {
        next(error);
    }
}

async function createTicket(req, res, next) {
    const { issue_summary, description, ticket_subtype_id } = req.body;
    const { user_id } = req.user;
    try {
        const ticket = await Ticket.query().insert({
            user_id,
            issue_summary,
            description,
            ticket_subtype_id,
        });

        res.status(201).json(ticket);
    } catch (error) {
        next(error);
    }
}

// TODO AUTH MIDDLEWARE ONLY ADMINS AND OWNER CAN DELETE
async function deleteOne(req, res, next) {
    const { id } = req.params;
    try {
        const ticket = await Ticket.query().delete({ id });

        res.status(200).json({ message: "Ticket Deleted", ticket });
    } catch (error) {
        next(error);
    }
}
module.exports = router;
