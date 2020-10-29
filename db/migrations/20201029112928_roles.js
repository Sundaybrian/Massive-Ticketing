const Knex = require("knex");

const tableNames = require("../../src/constants/tableNames");

/** @param {Knex} knex */
exports.up = async function (knex) {
    await knex.schema.table(tableNames.user, (table) => {
        table.string("role", 10).notNullable();
    });
};

/** @param {Knex} knex */
exports.down = async function (knex) {
    await knex.schema.table(tableNames.user, (table) => {
        table.dropColumn("role");
    });
};
