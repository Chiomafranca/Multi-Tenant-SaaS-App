const jwt = require('jsonwebtoken');

// 🔹 Authenticate User
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

// 🔹 Authorization Middleware for Audit Logs
const authorizeAuditLog = (req, res, next) => {
    const allowedRoles = ['admin', 'security', 'auditor']; // Roles that can access audit logs
    if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

module.exports = { authenticate, authorizeAuditLog };
