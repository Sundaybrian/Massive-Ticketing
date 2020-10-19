const Knex = require("knex");

const tableNames = require("../../src/constants/tableNames");

const {
  addDefaultColumns,
  addNameDesc,
} = require("../../src/Utils/tableUtils");

/** @param {Knex} knex */
exports.up = async function (knex) {
  // start with tables without fk references

  await Promise.all([
    knex.schema.createTable(tableNames.department, (table) => {
      addNameDesc(table);
      addDefaultColumns(table);
    }),

    knex.schema.createTable(tableNames.sla, (table) => {
      addNameDesc(table);
      table.float("resolution_time", 2).notNullable();
      table.float("update_timeline", 2).notNullable();
      addDefaultColumns(table);
    }),

    knex.schema.createTable(tableNames.status, (table) => {
      addNameDesc(table);
      addDefaultColumns(table);
    }),

    knex.schema.createTable(tableNames.role, (table) => {
      addNameDesc(table);
      addDefaultColumns(table);
    }),
  ]);
};

exports.down = async function (knex) {
  await Promise.all(
    [
      tableNames.department,
      tableNames.sla,
      tableNames.status,
      tableNames.role,
    ].map((tablename) => knex.schema.dropTableIfExists(tablename))
  );
};
