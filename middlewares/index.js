module.exports = (app) => {
  app.middlewares = {
    bodyParser: require('body-parser'),
    ensureFields: require('./ensureFields'),
    ensureRights: require('./ensureRights')(app),
    ensureAuthenticated: require('./ensureAuthenticated')(app)
  };

  app.use(require('./boot'));

}
