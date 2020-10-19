const Joi = require("joi");
const validateRequest = require("../../_middlewares/validateRequest");

exports.signupSchema = (req, res, next) => {
  const schema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  });
  validateRequest(req, next, schema);
};
