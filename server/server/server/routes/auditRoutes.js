const express = require('express');
const Audit = require('../models/audit');
const router = express.Router();

// Get audits by hospital ID
router.get('/:hospitalId', async (req, res) => {
  const audits = await Audit.find({ hospitalId: req.params.hospitalId }).populate('auditTypeId');
  res.json(audits);
});

// Create a new audit
router.post('/', async (req, res) => {
  const newAudit = new Audit(req.body);
  await newAudit.save();
  res.json(newAudit);
});

// Update audit with audit type
router.put('/:id', async (req, res) => {
  try {
    console.log(`Updating audit ID: ${req.params.id} with auditTypeId: ${req.body.auditTypeId}`); // Add logging
    const audit = await Audit.findByIdAndUpdate(req.params.id, { auditTypeId: req.body.auditTypeId }, { new: true });
    res.json(audit);
  } catch (error) {
    console.error('Error updating audit:', error); // Add logging
    res.status(404).send('Audit not found');
  }
});

module.exports = router;
