const request = require("supertest");
const app = require("../../app");

describe("POST /api/v1/auth/signup", () => {
  it("Should not signup a user with missing fields", async () => {
    await request(app)
      .post("/api/v1/auth/signup")
      .send({
        fullname: "omwami rules",
        password: "12345678yh",
      })
      .expect("Content-Type", /json/)
      .expect(500);
  });

  it("Should sign up a user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send({
        fullname: "omwami rules",
        email: "omwami@rules.com",
        password: "12345678yh",
        confirmPassword: "12345678yh",
      })
      .expect(201);

    expect(res.body.user.fullname).toEqual("omwami rules");
  });

  it("Should not sign up an existing user", async () => {
    await request(app)
      .post("/api/v1/auth/signup")
      .send({
        fullname: "omwami rules",
        email: "omwami@rules.com",
        password: "12345678yh",
        confirmPassword: "12345678yh",
      })
      .expect(403);
  });
});
