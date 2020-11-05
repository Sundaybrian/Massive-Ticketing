const express = require("express");
const router = express.Router();

const queries = require("./sla.queries");
const { createSchema } = require("./sla.validators");

// find all
router.get("/", async (req, res, next) => {
    try {
        const slas = await queries.find();
        if (slas.length > 0) {
            res.json(slas);
        }
    } catch (error) {
        next(error);
    }
});

// find by id
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const sla = await queries.get(parseInt(id) || 0);
        if (sla) {
            res.json(sla);
        }

        return next();
    } catch (error) {
        next(error);
    }
});

// create status
router.post("/", createSchema, async (req, res, next) => {
    try {
        console.log(req.body);
        const sla = await queries.create(req.body);

        if (sla) {
            return res.status(201).json(sla);
        }
    } catch (error) {
        next(error);
    }
});

// update status
router.patch("/:id", async (req, res, next) => {
    const { id } = req.params;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "description", "resolution_time"];
    const isValidUpdates = updates.every((item) => {
        return allowedUpdates.includes(item);
    });

    if (!isValidUpdates) {
        res.status(403);
        return next("Invalid Updates");
    }

    try {
        const sla = await queries.update(id, req.body);

        if (!sla) {
            return res.status(404);
        }

        res.status(200).json(sla);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
