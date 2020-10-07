const Knex = require("knex");

const {
  addDefaultColumns,
  addNameDesc,
  references,
} = require("../../src/Utils/tableUtils");

/** @param {Knex} knex */
exports.up = async function (knex) {
  // now for the tables with fk references

  await knex.schema.createTable(tableNames.user, (table) => {
    table.increments().notNullable();
    table.string("fullname", 100).notNullable();
    table.string("email", 254).notNullable().unique();
    table.string("image_url", 2000);
    table.boolean("active").notNullable().defaultTo(false);
    references(table, tableNames.department);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.auth, (table) => {
    table.increments().notNullable();
    references(table, tableNames.user);
    table.string("password", 180).notNullable();
    table.boolean("active").notNullable().defaultTo(false);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.role_user, (table) => {
    table.increments().notNullable();
    references(table, tableNames.user);
    references(table, tableNames.role);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.ticket_type, (table) => {
    addNameDesc(table);
    references(table, tableNames.department);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.ticket_subtype, (table) => {
    addNameDesc(table);
    references(table, tableNames.ticket_type);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.ticket, (table) => {
    table.increments().notNullable();
    table.string("issue_summary", 600).notNullable();
    table.string("description", 1300).notNullable();
    references(table, table.user);
    references(table, tableNames.ticket_subtype);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.ticket_history, (table) => {
    table.increments().notNullable();
    references(table, table.user);
    references(table, tableNames.status);
    references(table, tableNames.ticket);
    references(table, table.sla);
    table.string("comment", 1500).notNullable();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.resolution, (table) => {
    table.increments().notNullable();
    references(table, table.ticket_history);
    table.string("description", 1500).notNullable();
    addDefaultColumns(table);
  });
};

/** @param {Knex} knex */
exports.down = async function (knex) {
  await Promise.all(
    [
      resolution,
      ticket_history,
      ticket,
      ticket_subtype,
      ticket_type,
      role_user,
      auth,
      user,
    ].map((tableName) => knex.schema.dropTable(tableName))
  );
};
