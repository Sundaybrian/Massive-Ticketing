const router = require("express").Router({ mergeParams: true });
const TicketHistory = require("./ticketHistory.model");
const { canCreateHistory } = require("../../../Utils/permissions");
const Ticket = require("../tickets.model");

const auth = require("../../../_middlewares/auth");

router.get("/", auth, getTicketHistories);
router.post("/", auth, createHistory);

async function getTicketHistories(req, res, next) {
    try {
        const tickets = await TicketHistory.query().where({
            ticket_id: req.params.ticket_id,
        });

        if (!tickets) {
            res.status(404);
            next("No histories found");
        }

        res.json(tickets);
    } catch (error) {
        next(error);
    }
}

async function createHistory(req, res, next) {
    const { assigned_staff_id, status_id, sla_id, comment } = req.body;
    const { ticket_id: id } = req.params;

    if (!canCreateHistory(req.user)) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        // update ticket id status
        const updateTicket = await Ticket.query().patchAndFetchById(id, {
            status_id,
        });

        const history = await TicketHistory.query().insert(
            {
                assigned_staff_id,
                status_id,
                sla_id,
                comment,
            },
            ["*"]
        );

        res.json(history);
    } catch (error) {
        next(error);
    }
}

module.exports = router;
