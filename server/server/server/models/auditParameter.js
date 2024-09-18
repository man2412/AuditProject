const mongoose = require('mongoose');

const auditParameterSchema = new mongoose.Schema({
  auditId: { type: mongoose.Schema.Types.ObjectId, ref: 'Audit' },
  parameterName: String,
  yes: Boolean,
  no: Boolean,
  description: String,
  rating: Number,
  fileUrls: [String]
});

module.exports = mongoose.model('AuditParameter', auditParameterSchema);
