const { Model } = require("objection");
const tableNames = require("../../constants/tableNames");
const userSchema = require("./users.schema.json");

class User extends Model {
  static get tableName() {
    return tableNames.user;
  }

  static get jsonSchema() {
    return userSchema;
  }

  static get relationMappings() {
    const Department = require("../department/department.model");

    return {
      department: {
        relation: Model.BelongsToOneRelation,
        modelClass: Department,
        join: {
          from: `${tableNames.department}.id`,
          to: `${tableNames.user}.department_id`,
        },
      },
    };
  }
}

module.exports = User;
