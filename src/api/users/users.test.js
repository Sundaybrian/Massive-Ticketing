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

  it("Should fail to find a user by its id", async () => {
    const res = await request(app)
      .get("/api/v1/users/2")
      .expect("Content-Type", /json/)
      .expect(500);
  });

  it("Should return a user by its id", async () => {
    const res = await request(app)
      .get("/api/v1/users/1")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.fullname).toEqual("sunday omwami");
  });
});
