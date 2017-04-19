module.exports = (app) => {
  app.actions = {
    users: require('./users')(app)
  }
};
