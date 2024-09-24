const mongoose = require('mongoose');

const parameterNameSchema = new mongoose.Schema({
  name: { type: String, required: true },           // Parameter name (e.g., "Image Quality", "Radiation Safety")
  auditTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'AuditType', required: true }  // Reference to the Audit Type
});

module.exports = mongoose.model('ParameterName', parameterNameSchema);
