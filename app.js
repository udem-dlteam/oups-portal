const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const loginPagePath = path.join(__dirname, 'public', 'login.html');
const loginPageHtml = fs.readFileSync(loginPagePath, 'utf8');
const createAccountPagePath = path.join(__dirname, 'public', 'create-account.html');
const createAccountPageHtml = fs.readFileSync(createAccountPagePath, 'utf8');

app.use(express.json());

// In-memory user store: email -> password
const users = new Map();

app.get('/', (_req, res) => {
  res.type('html').send(loginPageHtml);
});

app.get('/create-account', (_req, res) => {
  res.type('html').send(createAccountPageHtml);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password || users.get(email) !== password) {
    return res.status(401).json({ error: 'incorrectPassword' });
  }
  res.json({ success: true });
});

app.post('/create-account', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'missingFields' });
  }
  if (users.has(email)) {
    return res.status(409).json({ error: 'accountExists' });
  }
  users.set(email, password);
  res.status(201).json({ success: true });
});

module.exports = app;
