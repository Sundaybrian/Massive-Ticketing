const { Model } = require("objection");

const schema = require("./tickets.schema.json");
const TicketHistory = require("./ticketHistory/ticketHistory.model");
const tableNames = require("../../constants/tableNames");
const User = require("../users/users.model");
const TicketSubtype = require("../ticketType/ticketSubtype/ticketSubtype.model");

class Ticket extends Model {
    static get tableName() {
        return tableNames.ticket;
    }

    static get jsonSchema() {
        return schema;
    }

    static get relationMappings() {
        return {
            ticket_histories: {
                relation: Model.HasManyRelation,
                modelClass: TicketHistory,
                join: {
                    from: `${tableNames.ticket}.id`,
                    to: `${tableNames.ticket_history}.ticket_id`,
                },
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${tableNames.ticket}.user_id`,
                    to: `${tableNames.user}.id`,
                },
            },

            subtype: {
                relation: Model.BelongsToOneRelation,
                modelClass: TicketSubtype,
                join: {
                    from: `${tableNames.ticket}.ticket_subtype_id`,
                    to: `${tableNames.subtype}.id`,
                },
            },
        };
    }
}

module.exports = Ticket;
