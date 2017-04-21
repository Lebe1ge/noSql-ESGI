module.exports = (app) => {

    app.get('/search', app.actions.tweets.create);
    app.get('/', app.actions.tweets.show);
    // app.use('/twitter', require('./twitter')(app));
};
