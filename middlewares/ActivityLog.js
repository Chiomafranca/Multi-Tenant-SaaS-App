const ActivityLog = require('../models/ActivityLog');

const activityLogger = async (req, res, next) => {
  res.on('finish', async () => {
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      try {
        await ActivityLog.create({
          user: req.user?.id || 'Unknown',
          method: req.method,
          endpoint: req.originalUrl,
          status: res.statusCode,
          tenantId: req.user?.tenantId,
          timestamp: new Date()
        });
      } catch (err) {
        console.error('Activity logging failed:', err.message);
      }
    }
  });
  next();
};

module.exports = { activityLogger };
