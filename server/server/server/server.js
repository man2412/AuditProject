const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware

const auditRoutes = require('./routes/auditRoutes');
const auditParameterRoutes = require('./routes/auditParameterRoutes');
const auditTypeRoutes = require('./routes/auditTypeRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins (replace '*' with your frontend URL in production)

mongoose.connect('mongodb://localhost:27017/AuditDB', { useNewUrlParser: true, useUnifiedTopology: true });

// API routes
app.use('/api/audits', auditRoutes);
app.use('/api/audit-parameters', auditParameterRoutes);
app.use('/api/audit-types', auditTypeRoutes);
app.use('/api/hospitals', hospitalRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!'); // Example generic error response
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
