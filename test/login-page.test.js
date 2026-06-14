const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../app');

test('GET / returns login page with required language options and logo', async () => {
  const response = await request(app).get('/');

  assert.equal(response.status, 200);
  assert.match(response.text, /<option value="en">English<\/option>/);
  assert.match(response.text, /<option value="fr">French<\/option>/);
  assert.match(response.text, /<option value="es">Spanish<\/option>/);
  assert.match(response.text, /<option value="pt">Portuguese<\/option>/);
  assert.match(response.text, /<option value="de">German<\/option>/);
  assert.match(response.text, /<option value="ja">Japanese<\/option>/);
  assert.match(response.text, /src="https:\/\/oups-app\.com\//);
});
