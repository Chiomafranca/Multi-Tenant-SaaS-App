const AuditLog = require('../models/AuditLog');

// Get all audit logs
exports.getAllAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find();
    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single audit log by ID
exports.getAuditLogById = async (req, res) => {
  try {
    const { id } = req.params;
    const log = await AuditLog.findById(id);
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
exports.createAuditLog = async (req, res) => {
  try {
    const { tenantId, userId, action, entity, entityId, details } = req.body;

    const log = new AuditLog({ tenantId, userId, action, entity, entityId, details });
    await log.save();

    res.status(201).json({ message: 'Audit log created successfully', log });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an audit log (not common, but useful for corrections)
exports.updateAuditLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, entity, details } = req.body;

    const log = await AuditLog.findByIdAndUpdate(
      id,
      { action, entity, details },
      { new: true }
    );

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
exports.deleteAuditLog = async (req, res) => {
  try {
    const { id } = req.params;

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
