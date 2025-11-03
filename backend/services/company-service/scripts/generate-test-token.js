#!/usr/bin/env node

// For testing, we'll generate a token using the shared package
const path = require('path');
process.chdir(path.join(__dirname, '..'));

const jwt = require('jsonwebtoken');

// Create a test JWT token for admin user
const payload = {
  userId: '507f1f77bcf86cd799439011',
  email: 'admin@hirepro.com',
  role: 'admin',
  companyId: '507f1f77bcf86cd799439012'
};

const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const token = jwt.sign(payload, secret, { expiresIn: '24h' });

console.log('Generated Test JWT Token:');
console.log(token);
console.log('\nUse this token in your requests:');
console.log(`Authorization: Bearer ${token}`);
console.log('\nExample cURL command:');
console.log(`curl -X POST http://localhost:8001/api/v1/companies \\
  -H "Authorization: Bearer ${token}" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Test Company", "industry": "Technology", "size": "51-200"}'`);

