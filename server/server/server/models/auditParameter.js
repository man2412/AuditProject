const mongoose = require('mongoose');

const auditParameterSchema = new mongoose.Schema({
  auditId: { type: mongoose.Schema.Types.ObjectId, ref: 'Audit' },
  parameterNameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParameterName'
    },
    description: { type: String},
    fileUrls: [String],
    priority: { type: String },
    category: { type: String },
    rating: { type: Number },
    availability: { type: Boolean}
});

module.exports = mongoose.model('AuditParameter', auditParameterSchema);
