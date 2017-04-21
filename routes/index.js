module.exports = (app) => {
    app.use('/twitter', require('./twitter')(app));
};
