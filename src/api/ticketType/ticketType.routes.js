const express = require("express");
const TicketType = require("./ticketType.model");
const TicketSubtype = require("./ticketSubtype/ticketSubtype.routes");

const router = express.Router({ mergeParams: true });

// /api/v1/auth/ticket-type/1/ticket-subtype
router.use("/:ticket_type_id/ticket_subtype", TicketSubtype);

router.get("/", getAllTicketTypes);
router.get("/:id", getTicketTypeById);
router.post("/", createTicketType);
router.patch("/:id", updateTicketType);

async function getAllTicketTypes(req, res, next) {
    try {
        const items = await TicketType.query().where("deleted_at", null);
        res.json(items);
    } catch (error) {
        next(error);
    }
}

async function getTicketTypeById(req, res, next) {
    try {
        const items = await TicketType.query()
            .where({ deleted_at: null, id: req.params.id })
            .withGraphFetched("ticket_subtypes")
            .first();
        if (items) {
            res.json(items);
        }

        res.status(404).json({ message: "Not found" });
    } catch (error) {
        next(error);
    }
}

async function createTicketType(req, res, next) {
    const { name, description, department_id } = req.body;
    try {
        // TODO:authorization middleware, only admins can create tickettypes
        const item = await TicketType.query().insert({
            name,
            description,
            department_id,
        });
        res.status(201).json(item);
    } catch (error) {
        next(error);
    }
}

async function updateTicketType(req, res, next) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "description"];
    const isValidUpdates = updates.every((item) => {
        return allowedUpdates.includes(item);
    });

    if (!isValidUpdates) {
        res.status(403);
        return next("Invalid Updates");
    }

    try {
        // validate name of tickettype
        if (await TicketType.query().where({ name: req.body.name }).first()) {
            throw `${req.body.name} already exists`;
        }

        const item = await TicketType.query().patchAndFetchById(req.params.id, {
            ...req.body,
        });
        res.json(item);
    } catch (error) {
        next(error);
    }
}

// ==============helpers===========================
async function getTicketType(id) {
    const item = await TicketType.query().where({
        deleted_at: null,
        id: req.params.id,
    });

    if (!item) throw "TicketType not found";
    return item;
}

module.exports = router;
