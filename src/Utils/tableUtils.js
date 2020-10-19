function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.datetime("deleted_at");
}

function addNameDesc(table) {
  table.increments().notNullable();
  table.string("name", 100).notNullable().unique();
  table.string("description", 1500).notNullable();
}

function references(table, tableName, columnName = null, notNullable = true) {
  const definition = table
    .integer(`${columnName || tableName}_id`)
    .unsigned()
    .references("id")
    .inTable(tableName)
    .onDelete("cascade");

  if (notNullable) {
    definition.notNullable();
  }

  return definition;
}

module.exports = {
  addDefaultColumns,
  references,
  addNameDesc,
};
