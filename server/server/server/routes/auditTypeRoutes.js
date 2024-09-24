const express = require('express');
const mongoose = require('mongoose');
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

router.get('/:id', async (req, res) => {
  try {
      const auditType = await AuditType.findById(req.params.id);
      if (!auditType) {
          return res.status(404).send('Audit Type not found');
      }
      res.json(auditType);
  } catch (err) {
      res.status(500).send('Server error');
  }
});



module.exports = router;
