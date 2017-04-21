const Router = require('express').Router;

module.exports = (app) => {
    let router = new Router();

    router.get('/:search',
        app.actions.tweets.create
    );

    router.get('/data/getByCountry',
        app.actions.tweets.getByCountry
    );

    router.get('/data/getFavoriteTweet',
        app.actions.tweets.getFavoriteTweet
    );

    return router;
};
