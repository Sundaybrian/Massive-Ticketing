// TODO: SEED DB WITH INITAL DATA
const tableNames = require("../../src/constants/tableNames");

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.status).del();
  // Inserts seed entries
  await knex(tableNames.status).insert([
    { id: 1, name: "rowValue1", description: "lorem ipum lorem ipsum lorem" },
    { id: 2, name: "rowValue2", description: "lorem ipum lorem ipsum lorem" },
    { id: 3, name: "rowValue3", description: "lorem ipum lorem ipsum lorem" },
    { id: 4, name: "rowValue13", description: "lorem ipum lorem ipsum lorem" },
  ]);
};
