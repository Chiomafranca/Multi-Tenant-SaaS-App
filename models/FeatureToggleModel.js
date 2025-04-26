const mongoose = require('mongoose');

// Define the Feature Toggle Schema
const featureToggleSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true,
  },
  featureName: {
    type: String,
    required: true,
    trim: true,
  },
  enabled: {
    type: Boolean,
    required: true,
    default: false,  
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Set the updatedAt field to be updated automatically
featureToggleSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model based on the schema
const FeatureToggle = mongoose.model('FeatureToggle', featureToggleSchema);

module.exports = FeatureToggle;
