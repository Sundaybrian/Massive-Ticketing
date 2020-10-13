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
    const [status] = await db(tableNames.status)
      .insert(item)
      .select("id", "name", "description")
      .returning("*");
    return status;
  },
};
