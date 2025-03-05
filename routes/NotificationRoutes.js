const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/NotificationController');
const { authenticate, authorizeNotification } = require('../middleware/authMiddleware');


router.post('/notifications', authenticate, authorizeNotification(['admin']), NotificationController.createNotification);


router.get('/notifications/user/:userId', authenticate, authorizeNotification(['admin', 'user']), NotificationController.getUserNotifications);


router.get('/notifications/:id', authenticate, authorizeNotification(['admin', 'user']), NotificationController.getNotificationById);


router.put('/notifications/:id/read', authenticate, authorizeNotification(['admin', 'user']), NotificationController.markAsRead);


router.delete('/notifications/:id', authenticate, authorizeNotification(['admin']), NotificationController.deleteNotification);


router.delete('/notifications/user/:userId', authenticate, authorizeNotification(['admin', 'user']), NotificationController.deleteAllUserNotifications);

module.exports = router;
