const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");
const User = require("../users/users.model");
const role = require("../../constants/role");

const testUser = {
    fullname: "test user",
    email: "useremail@email.com",
    password: "emailpassword",
    role: role.User,
};

const token = jwt.sign(testUser, process.env.JWT_SECRET);

beforeEach(async () => {
    await User.query().insert(testUser);
});

describe("POST /api/v1/tickets", () => {
    it("Should fail to create a ticket for an authenticated user", async () => {
        const res = await request(app)
            .post("/api/v1/tickets/")
            .send({
                issue_summary: "Somebody",
                description: "Somebody description",
                ticket_subtype_id: 2,
            })
            .expect("Content-Type", /json/)
            .expect(403);
    });

    // it("Should fail to create a ticket with missing field", async () => {
    //     const res = await request(app)
    //         .post("/api/v1/tickets/")
    //         .send({
    //             issue_summary: "Somebody",
    //             description: "Somebody description",
    //         })
    //         .expect("Content-Type", /json/)
    //         .expect(500);
    // });
});
