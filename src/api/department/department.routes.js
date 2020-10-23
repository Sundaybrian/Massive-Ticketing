const router = require("express").Router();
const Department = require("./department.model");

const { createDepartmentSchema } = require("./department.validators");

router.post("/", createDepartmentSchema, createDepartment);
router.get("/");
router.get("/:id");
router.patch("/:id");
router.delete("/:id");

module.exports = router;

async function createDepartment(req, res, next) {
  const { name, description } = req.body;

  try {
    const existingDpt = await Department.query().where({ name }).first();

    if (existingDpt) {
      const error = new Error(name + " " + " already in use");
      throw error;
    }

    const newDepartment = await Department.query().insert(
      {
        name,
        description,
      },
      ["id", "name", "description"]
    );

    res.status(201).json(newDepartment);
  } catch (error) {
    console.log(error);
    next(error);
  }
}
