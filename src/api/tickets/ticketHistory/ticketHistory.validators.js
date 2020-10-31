const Joi = require("joi");
const validateRequest = require("../../_middlewares/validateRequest");

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        assigned_staff_id: Joi.number().required(),
        status_id: Joi.number().required(),
        ticket_id: Joi.number().required(),
        sla_id: Joi.number().required(),
        comment: Joi.number().required(),
    });
    validateRequest(req, next, schema);
};
