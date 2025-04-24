// models/APIKey.js
const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
  },
  key: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  lastUsed: { type: Date },
  isActive: { type: Boolean, default: true },
  usageCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("APIKey", apiKeySchema);
