const knex = require("knex");

const knexFile = require("../knexfile");
const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexFile[environment];

const db = knex(connectionConfig);

module.exports = db;
