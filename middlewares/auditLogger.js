
// Audit Logger Middleware (auditLogger.js)
const auditLogger = (req, res, next) => {
    console.log(`[AUDIT] ${req.method} ${req.url} - ${req.ip}`);
    next();
  };

  module.exports={auditLogger}