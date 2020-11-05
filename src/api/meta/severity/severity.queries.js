const db = require("../../../db");
const tableNames = require("../../../constants/tableNames");

module.exports = {
    // get all severity
    find() {
        return db(tableNames.severity).select(
            "id",
            "name",
            "description",
            "resolution_time"
        );
    },
    // get by id
    async get(id) {
        const [severity] = await db(tableNames.severity)
            .select("id", "name", "description", "resolution_time")
            .where({
                id,
            });

        return severity;
    },
    // create a severity
    async create(item) {
        const [severity] = await db(tableNames.severity).insert(item, [
            "id",
            "name",
            "description",
            "resolution_time",
            "update_timeline",
        ]);
        return severity;
    },

    //update severity
    async update(id, payload) {
        const [severity] = await db(tableNames.severity)
            .where({ id })
            .update({ ...payload }, [
                "id",
                "name",
                "description",
                "resolution_time",
            ]);

        return severity;
    },

    // TODO: should we delete a severity delete status
};
