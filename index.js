const express = require('express');
const Twit = require('twit');
const app = express();

require('./settings')(app);

let twitter = new Twit(app.settings.api.twitter);

console.log(`server listening on port ${app.settings.port}`);
app.listen(app.settings.port);

twitter.get('search/tweets', { q: '@twinpeaks since:2011-07-11', count: 100 }, function(err, data, response) {
  console.log(data)
});
