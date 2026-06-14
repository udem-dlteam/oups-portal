const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const loginPagePath = path.join(__dirname, 'public', 'login.html');
const loginPageHtml = fs.readFileSync(loginPagePath, 'utf8');

app.get('/', (_req, res) => {
  res.type('html').send(loginPageHtml);
});

module.exports = app;
