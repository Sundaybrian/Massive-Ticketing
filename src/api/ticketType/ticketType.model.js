const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const schema = require("./ticketType.schema.json");
const TicketSubtype = require("./ticketSubtype/ticketSubtype.model");

class TicketType extends Model {
    static get tableName() {
        return tableNames.ticket_type;
    }

    static get jsonSchema() {
        return schema;
    }

    static get relationMappings() {
        return {
            ticket_subtypes: {
                relation: Model.HasManyRelation,
                modelClass: TicketSubtype,
                join: {
                    from: `${tableNames.ticket_type}.id`,
                    to: `${tableNames.ticket_subtype}.ticket_type_id`,
                },
            },
        };
    }
}

module.exports = TicketType;
