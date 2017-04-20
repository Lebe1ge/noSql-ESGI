const mongoose = require('mongoose');
const bluebird = require('bluebird');

module.exports = (app) => {
    app.mongoose = mongoose.connect(app.settings.db.mongo.url);
    app.mongoose.Promise = bluebird;
    app.models = {
        Tweet: require('./Tweet')(app)
    }
};
