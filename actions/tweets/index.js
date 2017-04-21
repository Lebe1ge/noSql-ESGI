const Twitter = require('twit');
const mongoose = require('mongoose');
const path = require('path');

module.exports = (app) => {
    const Tweet = app.models.Tweet;

    return {
        create,
        show
    };

    function create(req, res, next) {
        let twitter = new Twitter(app.settings.api.twitter);
        let search = 'twinpeaks';
        let lastId = 0;
        let saved = 0;
        let requete = 0;
        let wait = false;
        let startDate = new Date();
        var d = new Date(); d.setMinutes(d.getMinutes() + 30);
        let endDate;

        return getTweets();

        function getTweets(){
            callApi()
                .then(createTweet)
                .then(ifExit);
        }

        function ifExit() {
            if(wait){
                console.log('Vous devez attendre ...');
                for(let min = 0; min <= 15; min++) {
                  setTimeout(function () {
                    console.log((15-min) + 'minutes a attendres');
                  },60000);
                }
                wait = false;
            }
            return getTweets();
        }

        function callApi(){
            return twitter.get('search/tweets', { q: '#'+ search, max_id: lastId, count: 100 }, (err, data, response) => {
              console.log(`Requête #${++requete} executed at ${new Date()}`);
              return data;
            });

            // return twitter.get('search/tweets', params, (err, data, response) => {return data;});
        }

        function createTweet(tweets){

          tweets = tweets.data.statuses;

            if(tweets === null){
              return null;
            } else {
              console.log(`Récupération de ${tweets.length} tweets`);
            }

            if(lastId === 0)
                lastId = tweets[0].id - 1;

            for(index in tweets) {

                if(tweets[index].id < lastId){
                    lastId = tweets[index].id - 1;
                }

                let twitt = new Tweet(tweets[index]);

                Tweet.find({id: tweets[index].id}, function(err, tweet){
                    if(!tweet.length){
                        saved++;
                        twitt.save();
                        console.log(`Tweet saved`);
                    }
                    next();
                });
            }
            return tweets;
        }
    }

    function show(req, res, next){
      res.status(200).sendFile(path.join(__dirname+'/../../views/index.html'));
    }
};
