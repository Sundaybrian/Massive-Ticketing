const router = require("express").Router({ mergeParams: true });
const TicketSubtype = require("./ticketSubtype.model");

router.get("/", getAllSubtypes);
router.post("/", createSubtype);
router.patch("/:id", updateSubtype);

async function getAllSubtypes(req, res, next) {
    try {
        const items = await TicketSubtype.query().where("deleted_at", null);

        res.json(items);
    } catch (error) {
        next(error);
    }
}

async function createSubtype(req, res, next) {
    const { ticket_type_id } = req.params;
    try {
        // get tickettype id from the url
        req.body["ticket_type_id"] = Number(ticket_type_id);

        const item = await TicketSubtype.query().insert(req.body);

        res.json(item);
    } catch (error) {
        next(error);
    }
}

async function updateSubtype(req, res, next) {
    try {
        const item = await TicketSubtype.query().patchAndFetchById(
            req.params.id,
            req.body
        );

        res.json(item);
    } catch (error) {
        next(error);
    }
}
module.exports = router;
