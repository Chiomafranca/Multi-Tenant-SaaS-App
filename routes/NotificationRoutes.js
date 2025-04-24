const express = require('express');
const router = express.Router();
const { authenticate, authorizeNotification } = require('../middleware/authMiddleware');
const { createNotification, getNotificationById, getUserNotifications, markAsRead, deleteAllUserNotifications, deleteNotification } = require('../controllers/NotificationRoutes');


router.post('/notifications', authenticate, authorizeNotification(['admin']), createNotification);


router.get('/notifications/user/:userId', authenticate, authorizeNotification(['admin', 'user']), getNotificationById);


router.get('/notifications/:id', authenticate, authorizeNotification(['admin', 'user']), getUserNotifications);


router.put('/notifications/:id/read', authenticate, authorizeNotification(['admin', 'user']), markAsRead);


router.delete('/notifications/:id', authenticate, authorizeNotification(['admin']), deleteAllUserNotifications);


router.delete('/notifications/user/:userId', authenticate, authorizeNotification(['admin', 'user']), deleteNotification);

module.exports = router;
