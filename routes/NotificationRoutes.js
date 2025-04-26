const express = require('express');
const router = express.Router();
const { auth, authorizeNotification } = require('../middlewares/notification');
const { createNotification, getOneNotificationByUserId, getAllNotifications, markAsRead, deleteAllUserNotifications, deleteNotification } = require('../controllers/NotificationController');

// Route for creating a new notification (Admin-only)
router.post('/', auth, authorizeNotification(['admin']), createNotification);

// Route to get notifications by userId (Admin & User can access)
router.get('/:userId/one', auth, authorizeNotification(['admin', 'user']), getOneNotificationByUserId);

// Route to get all notifications (Admin & User can access)
router.get('/', auth, authorizeNotification(['admin', 'user']), getAllNotifications);

// Route to mark a notification as read (Admin & User can access)
router.put('/:userId/read', auth, authorizeNotification(['admin', 'user']), markAsRead);

// Route to delete all notifications for a user (Admin-only)
router.delete('/:userId', auth, authorizeNotification(['admin']), deleteAllUserNotifications);

// Route to delete a specific notification (Admin & User can access)
router.delete('/:id', auth, authorizeNotification(['admin', 'user']), deleteNotification);

module.exports = router;
