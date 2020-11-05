const request = require("supertest");
const app = require("../../../app");

describe("Get /api/v1/severity", () => {
    it("Should return an array of statuses", async () => {
        const res = await request(app)
            .get("/api/v1/severity")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.length).toBeGreaterThan(1);
    });
});

describe("Get /api/v1/severity/:id", () => {
    it("Should return a single severity", async () => {
        const res = await request(app)
            .get("/api/v1/severity/1")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.id).toBe(1);
    });

    it("Should return 404 for a not found severity", async () => {
        await request(app)
            .get("/api/v1/severity/99")
            .expect("Content-Type", /json/)
            .expect(404);
    });
});

describe("POST /api/v1/severity", () => {
    it("Should return a created severity", async () => {
        const res = await request(app)
            .post("/api/v1/severity")
            .send({
                name: "test severity",
                description: "test severity desc 2",
            })
            .expect(201);

        expect(res.body.name).toEqual("test severity");
    });
});

describe("PATCH /api/v1/severity/:id", () => {
    it("Should return an updated severity", async () => {
        const res = await request(app)
            .patch("/api/v1/severity/1")
            .send({
                name: "test severity 1",
                description: "test severity desc 1",
            })
            .expect(200);

        expect(res.body.name).toEqual("test severity 1");
    });

    it("Should not update a severity", async () => {
        await request(app)
            .patch("/api/v1/severity/1")
            .send({
                name: "test severity 1",
                description: "test severity desc 1",
                value: "lorem not allowed",
            })
            .expect(403);
    });

    it("Should fail to update a non-existent severity", async () => {
        await request(app)
            .patch("/api/v1/severity/8")
            .send({
                name: "test severity 8",
                description: "test severity desc 8",
            })
            .expect(404);
    });
});
