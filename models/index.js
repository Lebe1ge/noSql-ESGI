const mongoose = require('mongoose');
const bluebird = require('bluebird');

module.exports = (app) => {
    app.mongoose = mongoose.connect("mongodb://localhost:27017/twitter");
    app.mongoose.Promise = bluebird;
    app.models = {
        Tweet: require('./Tweet')(app)
    }
};
