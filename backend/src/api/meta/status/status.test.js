const request = require("supertest");
const app = require("../../../app");
const db = require("../../../db");

describe("Get /api/v1/status", () => {
  it("Should return an array of statuses", async () => {
    const res = await request(app)
      .get("/api/v1/status")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.length).toBeGreaterThan(0);
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
      .get("/api/v1/status/5")
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
        description: "test status desc",
      })
      .expect(201);

    expect(res.name).toBe("test status");
  });
});
