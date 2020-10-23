const router = require("express").Router();
const Department = require("./department.model");

const { createDepartmentSchema } = require("./department.validators");

router.post("/", createDepartmentSchema, createDepartment);
router.get("/");
router.get("/:id");
router.patch("/:id");
router.delete("/:id");

module.exports = router;
