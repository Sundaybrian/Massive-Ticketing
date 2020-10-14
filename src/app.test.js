const request = require("supertest");
const app = require("./app");

describe("App GET /", () => {
  it("Should respond with a message", async () => {
    const res = await request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toEqual("Welcome to ticketing app api");
  });
});
