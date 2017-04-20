const Router = require('express').Router;

module.exports = (app) => {
    let router = new Router();

    router.get('/:search',
        app.actions.tweets.create
    );

    return router;
};