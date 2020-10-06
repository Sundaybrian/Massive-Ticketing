const Knex = require("knex");

const tableNames = require("../../src/constants/tableNames");

function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.datetime("deleted_at");
}

/** @param {Knex} knex */
exports.up = async function (knex) {
  await knex.schema.createTable(tableNames.department, (table) => {
    table.increments().notNullable();
    table.string("name", 100).notNullable().unique();
    table.text("description", 1500).notNullable();
    addDefaultColumns(table);
  });

  //   await knex.schema.createTable(tableNames.user, (table) => {
  //     table.increments().notNullable();
  //     table.string("fullname", 100).notNullable();
  //     table.text("email", 254).notNullable().unique();
  //     table.string("password", 500).notNullable();
  //     table.string("image_url", 600);
  //   });
};

exports.down = async function (knex) {
  await knex.schema.dropTable(tableNames.department);
};
