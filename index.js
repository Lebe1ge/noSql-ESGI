const express = require('express');
const app = express();
const Router = require('express').Router;

require('./settings')(app);
require('./routes')(app);

console.log(`server listening on port ${app.settings.port}`);
app.listen(app.settings.port);