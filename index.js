const express = require('express');
const app = express();
const Router = require('express').Router;
const path = require('path');
const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use("/styles",  express.static(__dirname + '/css'));
app.use("/scripts", express.static(__dirname + '/js'));
app.use("/lib", express.static(__dirname + '/lib'));
app.use("/plugin", express.static(__dirname + '/plugin'));
app.use("/chartjs", express.static(__dirname + '/chartjs'));

// require('./settings')(app);
require('./models')(app);
require('./actions')(app);
require('./routes')(app);


console.log(`server listening on port 1337`);
app.listen(1337);
