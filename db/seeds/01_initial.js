// TODO: SEED DB WITH INITAL DATA
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const tableNames = require("../../src/constants/tableNames");

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await Promise.all(
    Object.keys(tableNames).map((name) => {
      return knex(name).del();
    })
  );
  // crypto.randomBytes(15).toString("hex")
  const password = await bcrypt.hash("12345678yh", 10);

  const user = {
    email: "sunday@omwami.com",
    fullname: "sunday omwami",
    active: true,
    password,
  };

  const [createdUser] = await knex(tableNames.user).insert(user).returning("*");

  // Inserts seed entries
  await knex(tableNames.status).insert([
    { id: 1, name: "rowValue1", description: "lorem ipum lorem ipsum lorem" },
    { id: 2, name: "rowValue2", description: "lorem ipum lorem ipsum lorem" },
    { id: 3, name: "rowValue3", description: "lorem ipum lorem ipsum lorem" },
    { id: 4, name: "rowValue13", description: "lorem ipum lorem ipsum lorem" },
  ]);
};
