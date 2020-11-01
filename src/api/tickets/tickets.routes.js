const express = require("express");

const auth = require("../../_middlewares/auth");
const {
    canView,
    scopedItems,
    canDeleteItem,
} = require("../../Utils/permissions");

const { createSchema } = require("./tickets.validators");
const Ticket = require("./tickets.model");
const TicketHistory = require("./ticketHistory/ticketHistory.routes");

const router = express.Router({
    mergeParams: true,
});

// api/v1/tickets/1/ticket-history
router.use("/:ticket_id/ticketHistory", TicketHistory);

router.get("/", auth, getAllTickets);
router.get("/:id", auth, getTicketById);
router.post("/", auth, createSchema, createTicket);
router.delete("/:id", auth, deleteOne);

async function getAllTickets(req, res, next) {
    try {
        const tickets = await Ticket.query().where("deleted_at", null);

        res.json(scopedItems(req.user, tickets));
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

        if (!canView(req.user, ticket)) {
            return res.status(401).json({ message: "unathorized" });
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

        res.status(201).json({ ...basicDetails(ticket) });
    } catch (error) {
        next(error);
    }
}

async function deleteOne(req, res, next) {
    const { id } = req.params;
    try {
        const ticket = await getTicket(id);

        if (!canDeleteItem(req.user, ticket)) {
            res.status(401).json({ message: "Unauthorized" });
        }

        await Ticket.query().delete({ id });

        res.status(200).json({
            message: "Ticket Deleted",
            ticket: basicDetails(ticket),
        });
    } catch (error) {
        next(error);
    }
}

// =============== helper functions ===================//
async function getTicket(id) {
    const ticket = await Ticket.query().where({ id }).first();

    if (!ticket) throw "ticket not found";
    return ticket;
}

async function basicDetails(ticket) {
    const {
        id,
        user_id,
        issue_summary,
        description,
        ticket_subtype_id,
    } = ticket;
    return { id, user_id, issue_summary, description, ticket_subtype_id };
}

module.exports = router;
