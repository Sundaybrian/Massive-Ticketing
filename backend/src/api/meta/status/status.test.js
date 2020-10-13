const request = require("supertest");
const app = require("../../../app");

describe("Get /api/v1/status", () => {
  it("Should return an array of statuses", async () => {
    const res = await request(app)
      .get("/api/v1/status")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body).toEqual([]);
  });
});
