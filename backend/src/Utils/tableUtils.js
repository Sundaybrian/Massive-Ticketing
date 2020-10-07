function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.datetime("deleted_at");
}

function addNameDesc(table) {
  table.increments().notNullable();
  table.string("name", 100).notNullable().unique();
  table.string("description", 1500).notNullable();
}

function references(table, tableName) {
  table
    .integer(`${tableName}_id`)
    .unsigned()
    .references("id")
    .inTable(tableName)
    .onDelete("cascade");
}

module.exports = {
  addDefaultColumns,
  references,
  addNameDesc,
};
