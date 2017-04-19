module.exports = (app) => {
  const env = process.env.NODE_ENV || 'dev';
  const path = `./${env}.json`;

  app.settings = require(path);
}
