const db = require("../../../db");
const tableNames = require("../../../constants/tableNames");

module.exports = {
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
};
