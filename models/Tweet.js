const timestamps = require('mongoose-timestamps');

module.exports = (server) => {
    const Schema = server.mongoose.Schema;

    const TweetSchema = new Schema({
        title: String,
        dueDate: Date,

        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        assigned: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    });

    TweetSchema.plugin(timestamps);

    return server.mongoose.model('Tweet', TweetSchema);
};
