module.exports = (server) => {
    server.actions = {
        users: require('./users')(server),
        tweets: require('./tweets')(server)
    }
};
