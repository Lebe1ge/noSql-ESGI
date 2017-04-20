module.exports = (app) => {
  app.use('/users', require('./users')(app)),
  app.use('/twitter', require('./twitter')(app))
}
