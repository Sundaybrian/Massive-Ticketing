const { Model } = require("objection");
const tableNames = require("../../constants/tableNames");

class Department extends Model {
  static get tableName() {
    return tableNames.department;
  }
}
