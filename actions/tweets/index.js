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
        let twitter = new Twitter(app.settings.api.twitter);
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
      res.status(200).sendFile(path.join(__dirname+'/../../views/index.html'));
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
