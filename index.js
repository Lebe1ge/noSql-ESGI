const express = require('express');
const Twit = require('twit');
const app = express();

require('./settings')(app);

console.log(`server listening on port ${app.settings.port}`);
app.listen(app.settings.port);
