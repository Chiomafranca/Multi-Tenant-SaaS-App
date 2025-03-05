
// Audit Logger Middleware (auditLogger.js)
exports.auditLogger = (req, res, next) => {
    console.log(`[AUDIT] ${req.method} ${req.url} - ${req.ip}`);
    next();
  };