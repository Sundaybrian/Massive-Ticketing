const express = require("express");
const router = express.Router();

const queries = require("./severity.queries");
const { createSchema } = require("./severity.validators");

// find all
router.get("/", async (req, res, next) => {
    try {
        const severity = await queries.find();
        if (severity.length > 0) {
            res.json(severity);
        }
    } catch (error) {
        next(error);
    }
});

// find by id
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const severity = await queries.get(parseInt(id) || 0);
        if (severity) {
            res.json(severity);
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
        const severity = await queries.create(req.body);

        if (severity) {
            return res.status(201).json(severity);
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
        const severity = await queries.update(id, req.body);

        if (!severity) {
            return res.status(404);
        }

        res.status(200).json(severity);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
