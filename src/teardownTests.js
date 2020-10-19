const db = require("./db");

module.exports = async () => {
  await db.migrate.rollback();
  await db.destroy();
};
