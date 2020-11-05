// TODO: SEED DB WITH INITAL DATA
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const tableNames = require("../../src/constants/tableNames");
const roles = require("../../src/constants/role");

exports.seed = async (knex) => {
    // Deletes ALL existing entries
    await Promise.all(
        Object.keys(tableNames).map((name) => {
            return knex(name).del();
        })
    );
    // crypto.randomBytes(15).toString("hex")
    const password = await bcrypt.hash("12345678yh", 10);

    const user = {
        email: "sunday@omwami.com",
        fullname: "sunday omwami",
        password,
        role: roles.Admin,
        active: true,
    };

    const [createdUser] = await knex(tableNames.user)
        .insert(user)
        .returning("*");

    // Inserts seed entries
    await knex(tableNames.status).insert([
        {
            name: "New",
            description: "lorem ipum lorem ipsum lorem",
        },
        {
            name: "Assigned",
            description: "lorem ipum lorem ipsum lorem",
        },
        {
            name: "Inprogress",
            description: "lorem ipum lorem ipsum lorem",
        },
        {
            name: "Overdue",
            description: "lorem ipum lorem ipsum lorem",
        },
        {
            name: "Closed",
            description: "lorem ipum lorem ipsum lorem",
        },
        {
            name: "Resolved",
            description: "lorem ipum lorem ipsum lorem",
        },
    ]);

    // Inserts seed entries
    await knex(tableNames.ticket_type).insert([
        {
            name: "Power",
            description: "Deals with power",
            department_id: 1,
        },
        {
            name: "Billing",
            description: "Deals with billing",
            department_id: 2,
        },
    ]);

    // Inserts seed entries
    await knex(tableNames.ticket_subtype).insert([
        {
            name: "No Power",
            ticket_type_id: 1,
            description: "no power",
        },
        {
            name: "Low Voltage",
            ticket_type_id: 1,
            description: "low voltage",
        },
        {
            name: "Overdraft",
            ticket_type_id: 2,
            description: "deals with overdraft",
        },
        {
            name: "Balance",
            ticket_type_id: 2,
            description: "Deals na balance",
        },
    ]);

    // Inserts seed entries
    await knex(tableNames.department).insert([
        {
            name: "Power",
            description: "Deals with power",
        },
        {
            name: "Finance",
            description: "Deals with finance things",
        },
    ]);

    // Inserts seed entries sla
    await knex(tableNames.severity).insert([
        {
            name: "Critical",
            description: "Deals with power",
            resolution_time: 2,
            update_timeline: 24,
        },
        {
            name: "Major",
            description: "Deals with power",
            resolution_time: 12,
            update_timeline: 24,
        },
        {
            name: "Minor",
            description: "Deals with power",
            resolution_time: 24,
            update_timeline: 72,
        },
    ]);
};
