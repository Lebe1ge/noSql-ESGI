module.exports = (app) => {

    app.get('/', app.actions.tweets.show);
    // app.use('/twitter', require('./twitter')(app));
};
