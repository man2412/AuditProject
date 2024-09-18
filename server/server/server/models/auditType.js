const mongoose = require('mongoose');

const auditTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('AuditType', auditTypeSchema);
