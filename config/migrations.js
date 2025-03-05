const mongoose = require('mongoose');
const winston = require('winston');
const Tenant = require('../models/TenantModel'); // Ensure correct path

// Database Migrations (migrations.js)
const runMigrations = async () => {
    try {
        winston.info('Running database migrations...');

        // Ensure Users collection has a unique index on email
        await mongoose.connection.db.collection('users').createIndex({ email: 1 }, { unique: true });

        // Check if AdminTenant exists, if not, create it
        const adminTenant = await Tenant.findOne({ name: 'AdminTenant' });
        if (!adminTenant) {
            await Tenant.create({ name: 'AdminTenant', owner: new mongoose.Types.ObjectId() }); // Owner required
            winston.info('✅ Created default AdminTenant.');
        }

        winston.info('✅ Migrations completed.');
    } catch (error) {
        winston.error('❌ Migration error:', error);
    }
};

// Export migration setup
exports.setupDatabaseMigrations = async () => {
    if (mongoose.connection.readyState === 1) {
        await runMigrations();
    } else {
        mongoose.connection.once('open', runMigrations);
    }
};
