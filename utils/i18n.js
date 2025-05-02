const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'hi'],
  directory: path.join(__dirname, '../translation'),
  defaultLocale: 'en',
  queryParameter: 'lang',
  objectNotation: true
});

module.exports = i18n;
