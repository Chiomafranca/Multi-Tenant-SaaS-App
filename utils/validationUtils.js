const Joi = require('joi');

const tenantSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  owner: Joi.string().required(),
  plan: Joi.string().valid('basic', 'premium', 'enterprise').required(),
});

function validateTenantData(data) {
  const { error } = tenantSchema.validate(data, { abortEarly: false });
  if (error) {
    return error.details.map((detail) => detail.message);
  }
  return null;
}

module.exports = { validateTenantData };
