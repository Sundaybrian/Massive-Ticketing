const Joi = require("joi");
const validateRequest = require("../../../_middlewares/validateRequest");

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        resolution_time: Joi.number().required(),
        update_timeline: Joi.number().required(),
    });
    validateRequest(req, next, schema);
};
