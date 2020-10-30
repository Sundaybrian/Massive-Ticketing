const request = require("supertest");
const app = require("../../app");

describe("Get /api/v1/ticket-types", () => {
    it("Should return an array of ticket types", async () => {
        const res = await request(app)
            .get("/api/v1/ticket-types")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.length).toBeGreaterThan(1);
    });

    it("Should fail to find a ticket type by its id", async () => {
        const res = await request(app)
            .get("/api/v1/ticket-types/99")
            .expect("Content-Type", /json/)
            .expect(404);
    });
});

describe("POST /api/v1/ticket-types", () => {
    it("Should fail to create a ticket type", async () => {
        const res = await request(app)
            .post("/api/v1/ticket-types")
            .send({
                name: "Power",
                description: "Deals with power",
            })
            .expect("Content-Type", /json/)
            .expect(500);
    });

    it("Should create a ticket", async () => {
        const res = await request(app)
            .post("/api/v1/ticket-types/")
            .send({
                name: "Power test",
                description: "Deals with power",
                department_id: 1,
            })
            .expect("Content-Type", /json/)
            .expect(201);
    });
});

describe("PATCH /api/v1/ticket-types", () => {
    it("Should fail to update a ticket", async () => {
        const res = await request(app)
            .patch("/api/v1/ticket-types/1")
            .send({
                name: "Power",
                descriptionfake: "Deals with power",
            })
            .expect("Content-Type", /json/)
            .expect(403);
    });

    // it("Should update a ticket", async () => {
    //     const res = await request(app)
    //         .patch("/api/v1/ticket-types/1")
    //         .send({
    //             name: "Power test 22",
    //             description: "Deals with power 22",
    //         })
    //         .expect("Content-Type", /json/)
    //         .expect(200);

    //     expect(res.body.item).toEqual("Power test 22");
    // });
});
