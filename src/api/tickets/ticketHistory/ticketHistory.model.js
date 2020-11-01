const { Model } = require("objection");

const schema = require("./ticketHistory.schema.json");
const tableNames = require("../../../constants/tableNames");
const User = require("../../users/users.model");
const Ticket = require("../tickets.model");

class TicketHistory extends Model {
    static get tableName() {
        return tableNames.ticket_history;
    }

    static get jsonSchema() {
        return schema;
    }

    static get relationMappings() {
        return {
            ticket: {
                relation: Model.BelongsToOneRelation,
                modelClass: Ticket,
                join: {
                    from: `${tableNames.ticket_history}.ticket_id`,
                    to: `${tableNames.ticket}.id`,
                },
            },
            staff: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${tableNames.ticket_history}.assigned_staff_id`,
                    to: `${tableNames.user}.id`,
                },
            },
            // status: {
            //     relation: Model.BelongsToOneRelation,
            //     modelClass: Status,
            //     join: {
            //         from: `${tableNames.ticket_history}.status_id`,
            //         to: `${tableNames.status}.id`,
            //     },
            // },

            // sla: {
            //     relation: Model.BelongsToOneRelation,
            //     modelClass: Sla,
            //     join: {
            //         from: `${tableNames.ticket_history}.sla_id`,
            //         to: `${tableNames.sla}.id`,
            //     },
            // },
        };
    }
}

module.exports = TicketHistory;
