const Router = require('express').Router;
const Twit = require('twit');

module.exports = (app) => {
    let router = new Router();
    let twitter = new Twit(app.settings.api.twitter);

    router.get('/:search',
        (req, res, next) => {
            console.log(req.params.search);
            twitter.get('search/tweets', { q: '@'+ req.params.search +' since:2011-07-11', count: 100 }, function(err, data, response) {
                res.send(data);
            });
        }
    );

    return router;
};