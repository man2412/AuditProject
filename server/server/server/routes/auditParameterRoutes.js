const express = require('express');
const AuditParameter = require('../models/auditParameter');
const router = express.Router();

router.get('/:auditId', async (req, res) => {
  const parameters = await AuditParameter.find({ auditId: req.params.auditId });
  res.json(parameters);
});

router.post('/', async (req, res) => {
  const newParameters = new AuditParameter(req.body);
  await newParameters.save();
  res.json(newParameters);
});

module.exports = router;
