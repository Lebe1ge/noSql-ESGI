const express = require('express');
const app = express();
const Router = require('express').Router;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use("/styles",  express.static(__dirname + '/css'));
app.use("/scripts", express.static(__dirname + '/js'));
app.use("/lib", express.static(__dirname + '/lib'));
app.use("/plugin", express.static(__dirname + '/plugin'));
app.use("/chartjs", express.static(__dirname + '/chartjs'));

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/public');
app.set('view engine', 'html');

require('./settings')(app);
require('./models')(app);
require('./actions')(app);
require('./routes')(app);

console.log(`server listening on port ${app.settings.port}`);
app.listen(app.settings.port);
