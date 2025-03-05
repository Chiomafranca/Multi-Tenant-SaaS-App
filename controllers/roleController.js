const Role = require('../models/roleModel');

const roleController = {
    // Create a new role
    createRole: async (req, res) => {
        try {
            const { name, permissions } = req.body;
            const role = new Role({ name, permissions });
            await role.save();
            res.status(201).json({ message: 'Role created successfully', role });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Get all roles
    getAllRoles: async (req, res) => {
        try {
            const roles = await Role.find();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get a single role by ID
    getRoleById: async (req, res) => {
        try {
            const role = await Role.findById(req.params.id);
            if (!role) return res.status(404).json({ message: 'Role not found' });
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a role
    updateRole: async (req, res) => {
        try {
            const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!role) return res.status(404).json({ message: 'Role not found' });
            res.status(200).json({ message: 'Role updated successfully', role });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a role
    deleteRole: async (req, res) => {
        try {
            const role = await Role.findByIdAndDelete(req.params.id);
            if (!role) return res.status(404).json({ message: 'Role not found' });
            res.status(200).json({ message: 'Role deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = roleController;
