const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../app');

test('GET / returns login page with required language options and logo', async () => {
  const response = await request(app).get('/');

  assert.equal(response.status, 200);
  assert.match(response.text, /<option value="en">English<\/option>/);
  assert.match(response.text, /<option value="fr">Français|Français<\/option>/);
  assert.match(response.text, /<option value="es">Español<\/option>/);
  assert.match(response.text, /<option value="pt">Português<\/option>/);
  assert.match(response.text, /<option value="de">Deutsch<\/option>/);
  assert.match(response.text, /<option value="ja">日本語<\/option>/);
  assert.match(response.text, /src="https:\/\/oups-app\.com\/logo\+oups-01\.png"/);
});

test('GET / language selector is in the upper-right topbar with a globe icon', async () => {
  const response = await request(app).get('/');
  const html = response.text;

  // Topbar nav wraps the language widget
  assert.match(html, /class="topbar"/);
  // Globe emoji icon
  assert.match(html, /🌐/);
  // The select is inside the lang-widget
  assert.match(html, /class="lang-widget"/);
  assert.match(html, /id="language"/);
});

test('GET / includes translations for all supported languages', async () => {
  const response = await request(app).get('/');
  const html = response.text;

  // English
  assert.match(html, /'Sign in to Oups! portal'/);
  assert.match(html, /'Login'/);
  assert.match(html, /'Forgot password\?'/);
  assert.match(html, /'Create an account'/);
  // French
  assert.match(html, /'Se connecter au portail Oups!'/);
  assert.match(html, /'Se connecter'/);
  assert.match(html, /'Mot de passe'/);
  assert.match(html, /'Mot de passe oubli/);
  assert.match(html, /'Cr/);
  // Spanish
  assert.match(html, /'Iniciar sesi\u00f3n en el portal de Oups!'/);
  assert.match(html, /'Ingresar'/);
  assert.match(html, /'Crear una cuenta'/);
  // Portuguese
  assert.match(html, /'Entrar no portal Oups!'/);
  assert.match(html, /'Senha'/);
  assert.match(html, /'Criar uma conta'/);
  // German
  assert.match(html, /'Bei Oups!-Portal anmelden'/);
  assert.match(html, /'Einloggen'/);
  assert.match(html, /'Passwort vergessen/);
  assert.match(html, /'Konto erstellen'/);
  // Japanese
  assert.match(html, /'Oups!\u30dd\u30fc\u30bf\u30eb\u306b\u30b5\u30a4\u30f3\u30a4\u30f3'/);
  assert.match(html, /'\u30ed\u30b0\u30a4\u30f3'/);
  assert.match(html, /'\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u4f5c\u6210'/);
});

test('GET / page has data-i18n attributes on translatable elements', async () => {
  const response = await request(app).get('/');
  const html = response.text;

  assert.match(html, /data-i18n="title"/);
  assert.match(html, /data-i18n="email"/);
  assert.match(html, /data-i18n="password"/);
  assert.match(html, /data-i18n="submit"/);
  assert.match(html, /data-i18n="forgotPassword"/);
  assert.match(html, /data-i18n="createAccount"/);
});

test('GET / page places forgot-password before the login button', async () => {
  const response = await request(app).get('/');
  const html = response.text;

  assert.match(
    html,
    /data-i18n="forgotPassword"[\s\S]*Forgot password\?[\s\S]*class="submit-button" data-i18n="submit">Login<\/button>/,
  );
  assert.match(html, /Create an account/);
});
