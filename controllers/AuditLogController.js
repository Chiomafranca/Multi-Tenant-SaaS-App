const mongoose = require('mongoose');
const AuditLog = require('../models/AuditLogModel');

// Get all audit logs
const getAllAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().populate('userId');
    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single audit log by ID
const getAuditLogById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const log = await AuditLog.findById(id).populate('userId');
    if (!log) {
      return res.status(404).json({ message: 'Audit log not found' });
    }
    res.status(200).json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create an audit log
const createAuditLog = async (req, res) => {
  try {
    const { userId, action, entity, entityId, previousState, newState } = req.body;

    console.log('BODY:', req.body); 
    console.log('userId:', userId); 
    console.log('action:', action);
    console.log('entity:', entity);
    console.log('entityId:', entityId);

    if (!userId || !action || !entity || !entityId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const log = new AuditLog({ userId, action, entity, entityId, previousState, newState });
    await log.save();

    res.status(201).json({ message: 'Audit log created successfully', log });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Update an audit log
const updateAuditLog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const updateData = {};
    const { action, entity, previousState, newState } = req.body;
    if (action) updateData.action = action;
    if (entity) updateData.entity = entity;
    if (previousState) updateData.previousState = previousState;
    if (newState) updateData.newState = newState;

    const log = await AuditLog.findByIdAndUpdate(id, updateData, { new: true });
    if (!log) {
      return res.status(404).json({ message: 'Audit log not found' });
    }

    res.status(200).json({ message: 'Audit log updated successfully', log });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an audit log
const deleteAuditLog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const log = await AuditLog.findByIdAndDelete(id);
    if (!log) {
      return res.status(404).json({ message: 'Audit log not found' });
    }

    res.status(200).json({ message: 'Audit log deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllAuditLogs,
  getAuditLogById,
  createAuditLog,
  updateAuditLog,
  deleteAuditLog
};
