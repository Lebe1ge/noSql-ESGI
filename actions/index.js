module.exports = (app) => {
    app.actions = {
        tweets: require('./tweets')(app)
    }
};
