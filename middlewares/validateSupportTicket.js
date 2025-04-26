const { check, validationResult } = require('express-validator');

const validateSupportTicket = [
  check('subject').notEmpty().withMessage('Subject is required'),
  check('message').notEmpty().withMessage('Message is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateSupportTicket };
