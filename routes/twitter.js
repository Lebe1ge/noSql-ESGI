const Router = require('express').Router;
const Twit = require('twit');
const mongoose = require('mongoose');

module.exports = (app) => {
    let router = new Router();
    let twitter = new Twit(app.settings.api.twitter);
    let hashtag = [];

    router.get('/:search',
        (req, res, next) => {
            console.log(req.params.search);
            twitter.get('search/tweets', { q: '@'+ req.params.search +' since:2014-01-01', count: 100 }, function(err, data, response) {

            });
        }
    );

    return router;
};
