const express = require('express');
const AuditParameter = require('../models/auditParameter');
const router = express.Router();

// Get parameters by auditId
router.get('/:auditId', async (req, res) => {
  try {
    const parameters = await AuditParameter.find({ auditId: req.params.auditId });
    res.json(parameters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching parameters' });
  }
});

// Create a new parameter
router.post('/', async (req, res) => {
  try {
    const newParameter = new AuditParameter(req.body);
    await newParameter.save();
    res.status(201).json(newParameter);
  } catch (error) {
    res.status(500).json({ message: 'Error saving parameter' });
  }
});

// Update an existing parameter
router.put('/:id', async (req, res) => {
  try {
    const updatedParameter = await AuditParameter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedParameter) {
      return res.status(404).json({ message: 'Parameter not found' });
    }
    res.json(updatedParameter);
  } catch (error) {
    res.status(500).json({ message: 'Error updating parameter' });
  }
});

module.exports = router;
