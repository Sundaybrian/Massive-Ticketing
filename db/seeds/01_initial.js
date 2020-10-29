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
            id: 1,
            name: "New",
            description: "lorem ipum lorem ipsum lorem",
        },
        {
            id: 2,
            name: "Assigned",
            description: "lorem ipum lorem ipsum lorem",
        },
        {
            id: 3,
            name: "Inprogress",
            description: "lorem ipum lorem ipsum lorem",
        },
        {
            id: 4,
            name: "Overdue",
            description: "lorem ipum lorem ipsum lorem",
        },
        {
            id: 5,
            name: "Closed",
            description: "lorem ipum lorem ipsum lorem",
        },
        {
            id: 6,
            name: "Resolved",
            description: "lorem ipum lorem ipsum lorem",
        },
    ]);
};
