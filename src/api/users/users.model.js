const { Model } = require("objection");
const tableNames = require("../../constants/tableNames");
const userSchema = require("./users.schema.json");
const Auth = require("../auth/auth.model");

class User extends Model {
  static get tableName() {
    return tableNames.user;
  }

  static get jsonSchema() {
    return userSchema;
  }

  static get relationMappings() {
    return {
      auth: {
        relation: Model.HasOneRelation,
        modelClass: Auth,
        join: {
          from: `${tableNames.user}.id`,
          to: `${tableNames.auth}.user_id`,
        },
      },
    };
  }
}

module.exports = User;
