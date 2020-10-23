const Joi = require("joi");
const validateRequest = require("../../_middlewares/validateRequest");

exports.createDepartmentSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};
