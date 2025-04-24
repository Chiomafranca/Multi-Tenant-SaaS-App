const ActivityLog = require('../models/ActivityLog');

const createActivityLog = async (req, res) => {
  const { tenantId, userId, action, description } = req.body;
  
  if (!tenantId || !userId || !action || !description) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newLog = new ActivityLog({ tenantId, userId, action, description });
    await newLog.save();
    
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ message: 'Activity log created successfully', log: newLog });
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ message: 'Error creating activity log', error: error.message });
  }
};

const getAllActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find();
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(logs);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ message: 'Error retrieving logs', error: error.message });
  }
};

const getActivityLogById = async (req, res) => {
  try {
    const log = await ActivityLog.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ message: 'Log not found' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(log);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ message: 'Error retrieving log', error: error.message });
  }
};

const updateActivityLog = async (req, res) => {
  try {
    const log = await ActivityLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!log) {
      return res.status(404).json({ message: 'Log not found' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'Log updated successfully', log });
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ message: 'Error updating log', error: error.message });
  }
};

const deleteActivityLog = async (req, res) => {
  try {
    const log = await ActivityLog.findByIdAndDelete(req.params.id);
    if (!log) {
      return res.status(404).json({ message: 'Log not found' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'Log deleted successfully' });
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ message: 'Error deleting log', error: error.message });
  }
};

module.exports = { createActivityLog, getAllActivityLogs, getActivityLogById, updateActivityLog, deleteActivityLog };
