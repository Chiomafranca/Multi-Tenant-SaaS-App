// controllers/NotificationController.js
const Notification = require('../models/NotificationModel');

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { userId, tenantId, title, message, type } = req.body;

    if (!userId || !tenantId || !title || !message || !type) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const notification = new Notification({
      userId,
      tenantId,
      title,
      message,
      type,
    });

    await notification.save();
    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get notifications for a user by userId
// Get notifications by userId
// Get notifications by userId
// Get one notification by userId
const getOneNotificationByUserId = async (req, res) => {
  try {
    const { userId } = req.params;  // Extract userId from URL parameters

    // Fetch a single notification for this userId
    const notification = await Notification.findOne({ userId }).sort({ createdAt: -1 });

    if (!notification) {
      return res.status(404).json({ message: 'No notification found for this user' });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get all notifications (Admin functionality)
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });

    if (!notifications.length) {
      return res.status(404).json({ message: 'No notifications found' });
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
  try {
    const { userId } = req.params; // Only use userId

    // Find the first unread notification for the user and mark it as read
    const notification = await Notification.findOneAndUpdate(
      { userId: userId, isRead: false }, // Target unread notifications
      { isRead: true }, // Mark as read
      { new: true } // Return the updated notification
    );

    if (!notification) {
      return res.status(404).json({ message: 'No unread notifications found for this user' });
    }

    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete all notifications for a user
const deleteAllUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    await Notification.deleteMany({ userId });

    res.status(200).json({ message: 'All notifications deleted for user' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createNotification,
  getOneNotificationByUserId,
  getAllNotifications,
  markAsRead,
  deleteAllUserNotifications,
  deleteNotification,
};
