const express = require('express');
const AuditType = require('../models/auditType');
const router = express.Router();

router.get('/', async (req, res) => {
  const auditTypes = await AuditType.find();
  res.json(auditTypes);
});

router.post('/', async (req, res) => {
  const newAuditType = new AuditType(req.body);
  await newAuditType.save();
  res.json(newAuditType);
});

module.exports = router;
