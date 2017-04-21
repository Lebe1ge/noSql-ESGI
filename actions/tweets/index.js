const Twitter = require('twit');
const mongoose = require('mongoose');
const path = require('path');

module.exports = (app) => {
    const Tweet = app.models.Tweet;

    return {
        create,
        show,
        searchByCountry
    };

    function create(req, res, next) {
        let twitter = new Twitter({
          "consumer_key" : "NxXZTtTKpa1pZYDCPqg3ZaIZb",
          "consumer_secret" : "LBOhHXfCHkuaYzOtquevtdMv0gyoINfZFGQl36CpVukhlWmFPU",
          "access_token" : "4514173763-RIel6iXsHQRpqRNlxiawcX5qfVfff0EwHyzIS60",
          "access_token_secret" : "nC0UgMqcSDmHVWI1evIYUjzZmF2BDidvqZrJ4rESBcJ23"
        });
        let search = req.params.search;
        let lastId = 0;
        let i = 0;
        let requete = 0;
        return getTweets();

        function getTweets(){
            getByHashtag()
                .then(createTweet)
                .then(ifExit);
        }

        function ifExit() {
            if(i < 100){
                i++;
                return getTweets();
            }else{
                res.send('Okay');
            }

        }

        function getByHashtag(){
            let params = { q: '#'+ search, max_id: lastId, count: 100 };
            requete++;
            return twitter.get('search/tweets', params, (err, data, response) => {return data;});
        }

        function createTweet(data){
            save = 0;
            if(lastId == 0) {
                lastId = data.data.statuses[0].id - 1;
            }
            for(index in data.data.statuses) {
                if(data.data.statuses[index].id < lastId){
                    lastId = data.data.statuses[index].id - 1;
                }
                let twitt = new Tweet(data.data.statuses[index]);

                Tweet.find({id: data.data.statuses[index].id}, function(err, docs){
                    if(!docs.length){
                        save++;
                        twitt.save();
                    }
                    next();
                });
            }
            console.log("Requete : "+ requete + ", enregistrement : "+save);
            return data;
        }
    }

    function show(req, res, next){
      data = getGraph();
      res.render('index', {title: "data"});
    }

    function getGraph(){
      let data = [];
      // data.push(getGraph1);
      // data.push(getGraph2);
      // data.push(getGraph3);
      // data.push(getGraph4);
      // data.push(getGraph5);
      // data.push(getGraph6);
      return data;
    }

    function searchByCountry(req, res, next) {
        Tweet.aggregate([
            {
                $group :
                {
                    _id : "$user.lang",
                    count: { $sum: 1 }
                }
            }
        ], function (err, result) {
            if (err) {
                next(err);
            } else {
                return res.json(result);
            }
        });
    }
};
