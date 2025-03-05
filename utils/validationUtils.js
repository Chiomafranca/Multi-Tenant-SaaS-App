// ../utils/validationUtils.js
const Joi = require('joi');

const tenantSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    address: Joi.string().min(5).max(100).optional(),
});

function validateTenantData(data) {
    const { error } = tenantSchema.validate(data, { abortEarly: false });
    if (error) {
        return error.details.map((detail) => detail.message);
    }
    return null; // No errors
}

module.exports = { validateTenantData };
