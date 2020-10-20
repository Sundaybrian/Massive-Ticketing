const request = require("supertest");
const app = require("../../app");
const User = require(".././users/users.model");

const testUser = {
  fullname: "mike test",
  email: "miketest@1212.com",
  password: "iamthatguymike",
};

beforeEach(async () => {
  await User.query().insert(testUser).returning("*");
});

afterEach(async () => {
  await User.query().where({ email: testUser.email }).delete();
});

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

describe("POST /api/v1/auth/signin", () => {
  it("Should login user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "sunday@omwami.com",
        password: "12345678yh",
      })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.user.fullname).toEqual("sunday omwami");
  });

  it("Should not login user with wrong password", async () => {
    await request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "sunday@omwami.com",
        password: "sunday omwami",
      })
      .expect("Content-Type", /json/)
      .expect(403);
  });

  it("Should fail to login for a non existenst user", async () => {
    await request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "fakeuser@gmail.com",
        password: "eveniamfake",
      })
      .expect(403);
  });
});
