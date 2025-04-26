const Permission = require('../models/PermissionModel');

// Create a new permission
const createPermission = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if permission already exists
    const existingPermission = await Permission.findOne({ name });
    if (existingPermission) {
      return res.status(400).json({ message: 'Permission already exists' });
    }

    const permission = new Permission({ name, description });
    await permission.save();

    res.status(201).json({ message: 'Permission created successfully', permission });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all permissions
const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single permission by ID
const getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.permissionId);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a permission
const updatePermission = async (req, res) => {
  try {
    const { name, description } = req.body;

    const permission = await Permission.findByIdAndUpdate(
      req.params.permissionId,
      { name, description },
      { new: true }
    );
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    res.status(200).json({ message: 'Permission updated successfully', permission });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a permission
const deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.permissionId);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    res.status(200).json({ message: 'Permission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports={createPermission, getPermissionById, getPermissions, updatePermission, deletePermission}
