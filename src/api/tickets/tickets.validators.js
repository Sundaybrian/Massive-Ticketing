const Joi = require("joi");
const validateRequest = require("../../_middlewares/validateRequest");

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        issue_summary: Joi.string().length(600).required(),
        description: Joi.string().length(1500).required(),
        ticket_subtype_id: Joi.number().required(),
    });

    validateRequest(req, next, schema);
};
