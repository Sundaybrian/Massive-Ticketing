const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");

//TODO: ADD SCHEMA

class Auth extends Model {
  static get tableName() {
    return tableNames.auth;
  }

  //   static get jsonSchema() {
  //     return schema;
  //   }
}

module.exports = Auth;
