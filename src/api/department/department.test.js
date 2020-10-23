const request = require("supertest");
const app = require("../../app");
const Department = require(".././department/department.model");

describe("POST /api/v1/department", () => {
  it("Should fail to create a department", async () => {
    await request(app)
      .post("/api/v1/department")
      .send({
        name: "some department",
      })
      .expect("Content-Type", /json/)
      .expect(500);
  });

  it("Should create a department", async () => {
    const res = await request(app)
      .post("/api/v1/department")
      .send({
        name: "some department",
        description: "lorem lorem lorem",
      })
      .expect("Content-Type", /json/)
      .expect(201);

    expect(res.body.name).toEqual("some department");
  });
});
