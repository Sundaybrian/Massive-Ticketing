const request = require("supertest");
const app = require("../../app");

describe("Get /api/v1/users", () => {
  it("Should return an array of users", async () => {
    const res = await request(app)
      .get("/api/v1/users")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.length).toBeGreaterThan(0);
  });
});
