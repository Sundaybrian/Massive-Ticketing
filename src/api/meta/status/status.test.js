const request = require("supertest");
const app = require("../../../app");

describe("Get /api/v1/status", () => {
    it("Should return an array of statuses", async () => {
        const res = await request(app)
            .get("/api/v1/status")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.length).toBeGreaterThan(3);
    });
});

describe("Get /api/v1/status/:id", () => {
    it("Should return a single status", async () => {
        const res = await request(app)
            .get("/api/v1/status/1")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.id).toBe(1);
    });

    it("Should return 404 for a not found status", async () => {
        await request(app)
            .get("/api/v1/status/99")
            .expect("Content-Type", /json/)
            .expect(404);
    });
});

describe("POST /api/v1/status", () => {
    it("Should return a created status", async () => {
        const res = await request(app)
            .post("/api/v1/status")
            .send({
                name: "test status",
                description: "test status desc 2",
            })
            .expect(201);

        expect(res.body.name).toEqual("test status");
    });
});

describe("PATCH /api/v1/status/:id", () => {
    it("Should return an updated status", async () => {
        const res = await request(app)
            .patch("/api/v1/status/1")
            .send({
                name: "test status 1",
                description: "test status desc 1",
            })
            .expect(200);

        expect(res.body.name).toEqual("test status 1");
    });

    it("Should not update a status", async () => {
        await request(app)
            .patch("/api/v1/status/1")
            .send({
                name: "test status 1",
                description: "test status desc 1",
                value: "lorem not allowed",
            })
            .expect(403);
    });

    it("Should fail to update a non-existent status", async () => {
        await request(app)
            .patch("/api/v1/status/8")
            .send({
                name: "test status 8",
                description: "test status desc 8",
            })
            .expect(404);
    });
});
