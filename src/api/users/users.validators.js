const Joi = require("joi");
const validateRequest = require("../../_middlewares/validateRequest");

exports.updateSchema = (req, res, next) => {
  const schema = Joi.object({
    fullname: Joi.string().empty(""),
    email: Joi.string().email().empty(""),
    password: Joi.string().min(8).empty(""),
    confirmPassword: Joi.string().valid(Joi.ref("password")).empty(""),
  });
  validateRequest(req, next, schema);
};
