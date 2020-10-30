const { Model } = require("objection");

const schema = require("./ticketSubtype.schema.json");
const tableNames = require("../../../constants/tableNames");

class TicketSubtype extends Model {
    static get tableName() {
        return tableNames.ticket_subtype;
    }

    static get jsonSchema() {
        return schema;
    }
}

module.exports = TicketSubtype;
