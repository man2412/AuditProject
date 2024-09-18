const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  auditorName: String,
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  auditTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'AuditType' , default: null },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('Audit', auditSchema);
