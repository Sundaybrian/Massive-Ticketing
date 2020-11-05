const db = require("../../../db");
const tableNames = require("../../../constants/tableNames");

module.exports = {
    // get all sla
    find() {
        return db(tableNames.sla).select(
            "id",
            "name",
            "description",
            "resolution_time"
        );
    },
    // get by id
    async get(id) {
        const [sla] = await db(tableNames.sla)
            .select("id", "name", "description", "resolution_time")
            .where({
                id,
            });

        return sla;
    },
    // create a sla
    async create(item) {
        const [sla] = await db(tableNames.sla).insert(item, [
            "id",
            "name",
            "description",
            "resolution_time",
            "update_timeline",
        ]);
        return sla;
    },

    //update sla
    async update(id, payload) {
        const [sla] = await db(tableNames.sla)
            .where({ id })
            .update({ ...payload }, [
                "id",
                "name",
                "description",
                "resolution_time",
            ]);

        return sla;
    },

    // TODO: should we delete a sla delete status
};
