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

test('GET / includes translations for all supported languages', async () => {
  const response = await request(app).get('/');
  const html = response.text;

  // All translations must be embedded in the JS on the page.
  // English
  assert.match(html, /'Sign in'/);
  assert.match(html, /'Login'/);
  // French
  assert.match(html, /'Connexion'/);
  assert.match(html, /'Se connecter'/);
  assert.match(html, /'Mot de passe'/);
  // Spanish
  assert.match(html, /'Iniciar sesi\u00f3n'/);
  assert.match(html, /'Ingresar'/);
  // Portuguese
  assert.match(html, /'Entrar'/);
  assert.match(html, /'Senha'/);
  // German
  assert.match(html, /'Anmelden'/);
  assert.match(html, /'Einloggen'/);
  assert.match(html, /'Passwort'/);
  // Japanese
  assert.match(html, /'\u30b5\u30a4\u30f3\u30a4\u30f3'/);
  assert.match(html, /'\u30ed\u30b0\u30a4\u30f3'/);
});

test('GET / page has data-i18n attributes on translatable elements', async () => {
  const response = await request(app).get('/');
  const html = response.text;

  assert.match(html, /data-i18n="title"/);
  assert.match(html, /data-i18n="email"/);
  assert.match(html, /data-i18n="password"/);
  assert.match(html, /data-i18n="language"/);
  assert.match(html, /data-i18n="submit"/);
});
