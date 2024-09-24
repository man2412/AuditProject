const express = require('express');
const ParameterName = require('../models/parameterName');
const router = express.Router();

// Route to get all parameter names by auditTypeId
router.get('/by-audit-type/:auditTypeId', async (req, res) => {
  try {
    const parameterNames = await ParameterName.find({ auditTypeId: req.params.auditTypeId });
    res.json(parameterNames);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve parameter names', error: err });
  }
});

// Route to add a new parameter name
router.post('/', async (req, res) => {
  try {
    const newParameterName = new ParameterName(req.body);
    await newParameterName.save();
    res.json(newParameterName);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add parameter name', error: err });
  }
});

module.exports = router;
