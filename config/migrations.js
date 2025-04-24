const mongoose = require('mongoose');
const logger = require("../config/logger")
const Tenant = require('../models/TenantModel'); // Ensure correct path

// Database Migrations (migrations.js)
const runMigrations = async () => {
    try {
        logger.info('Running database migrations...');

        // Ensure Users collection has a unique index on email
        await mongoose.connection.db.collection('users').createIndex({ email: 1 }, { unique: true });

        // Check if AdminTenant exists, if not, create it
        const adminTenant = await Tenant.findOne({ name: 'AdminTenant' });
        if (!adminTenant) {
            await Tenant.create({ name: 'AdminTenant', owner: new mongoose.Types.ObjectId() }); // Owner required
            logger.info('✅ Created default AdminTenant.');
        }

        logger.info('✅ Migrations completed.');
    } catch (error) {
        logger.error(`Migration error: ${error}`);

    }
};

// Export migration setup
const setupDatabaseMigrations = async () => {
    if (mongoose.connection.readyState === 1) {
        await runMigrations();
    } else {
        mongoose.connection.once('open', runMigrations);
    }
};

module.exports={setupDatabaseMigrations}
