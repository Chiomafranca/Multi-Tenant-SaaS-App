const Tenant = require('../models/TenantModel');
const UserModel = require('../models/UserModel');

// Create a new tenant
const createTenant = async (req, res) => {
  try {
    const { name, owner, plan } = req.body;

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'user not found' });
    }

    const tenant = new Tenant({ name, owner, plan });

    await tenant.save();

    user.tenant.push(tenant._id);

    user.save();

    res.status(201).json({ message: 'Tenant created successfully', tenant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tenants
const getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.status(200).json(tenants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single tenant by ID
const getTenantById = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
    res.status(200).json(tenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a tenant
const updateTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
    res.status(200).json({ message: 'Tenant updated successfully', tenant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a tenant
const deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndDelete(req.params.id);
    if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
    res.status(200).json({ message: 'Tenant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Suspend a tenant
const suspendTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      { status: 'suspended' },
      { new: true }
    );
    if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
    res.status(200).json({ message: 'Tenant suspended successfully', tenant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
  suspendTenant,
};
