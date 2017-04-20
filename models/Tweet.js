const timestamps = require('mongoose-timestamps');

module.exports = (app) => {
    const Schema = app.mongoose.Schema;

    const TweetSchema = new Schema({
        id: String,
        text: String,
        entities: Object,
        user: Object,
        created_at: Date
    });

    TweetSchema.plugin(timestamps);

    return app.mongoose.model('Tweet', TweetSchema);
};
