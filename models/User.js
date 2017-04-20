const timestamps = require('mongoose-timestamps');

module.exports = (server) => {
    const Schema = server.mongoose.Schema;
    const UserSchema = new Schema({
        name: {
            type: String,
            default: 'unknown'
        },
        tweets: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Tweet'
            }
        ],
    });

    UserSchema.plugin(timestamps);
    return server.mongoose.model('User', UserSchema);
};
