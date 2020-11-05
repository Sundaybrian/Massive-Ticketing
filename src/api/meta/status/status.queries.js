const db = require("../../../db");
const tableNames = require("../../../constants/tableNames");

module.exports = {
    // get all statuses
    find() {
        return db(tableNames.status).select("id", "name", "description");
    },
    // get by id
    async get(id) {
        const [status] = await db(tableNames.status)
            .select("id", "name", "description")
            .where({
                id,
            });

        return status;
    },
    // create a status
    async create(item) {
        const [status] = await db(tableNames.status).insert(item, [
            "id",
            "name",
            "description",
        ]);
        return status;
    },

    //update status
    async update(id, payload) {
        const [status] = await db(tableNames.status)
            .where({ id })
            .update({ ...payload }, ["id", "name", "description"]);

        return status;
    },

    // TODO: should we delete a status delete status
};
