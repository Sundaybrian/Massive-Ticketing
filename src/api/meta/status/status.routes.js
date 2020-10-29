const express = require("express");
const router = express.Router();

const queries = require("./status.queries");

// find all
router.get("/", async (req, res, next) => {
    try {
        const statuses = await queries.find();
        if (statuses.length > 0) {
            res.json(statuses);
        }
    } catch (error) {
        next(error);
    }
});

// find by id
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const status = await queries.get(parseInt(id) || 0);
        if (status) {
            res.json(status);
        }

        return next();
    } catch (error) {
        next(error);
    }
});

// create status
router.post("/", async (req, res, next) => {
    try {
        console.log(req.body);
        const status = await queries.create(req.body);

        if (status) {
            return res.status(201).json(status);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// update status
router.patch("/:id", async (req, res, next) => {
    const { id } = req.params;
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
        const status = await queries.update(id, req.body);

        if (!status) {
            return res.status(404);
        }

        res.status(200).json(status);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;
