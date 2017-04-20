module.exports = (server) => {
    const Tweet = server.models.Tweet;
    const User = server.models.User;

    return {
        create,
        list,
        show,
        update,
        remove,
        assign: require('./assign')(server)
    };

    function create(req, res, next) {
        let user = null;

        return User.findById(req.userId)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(403, 'invalid.user'))
            .then(createTweet)
            .then(setCreatorAndAssign)
            .then(persist)
            .then(res.commit)
            .catch(res.error);

        function createTweet(data) {
            user = data;
            return new Tweet(req.body);
        }

        function setCreatorAndAssign(todo) {
            todo.creator = req.userId;
            todo.assigned = req.userId;
            return todo;
        }

        function persist(todo) {
            return todo.save()
                .then(addToUser)
                .then(returnTweet);

            function addToUser(todo) {
                user.tasks.push(todo._id);
                user.save()
            }

            function returnTweet() {
                return todo;
            }
        }
    }

    function list(req, res, next) {
        Tweet.find()
            .then(res.commit)
            .catch(res.error);
    }

    function show(req, res, next) {
        Tweet.findById(req.params.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'todo.not.found'))
            .then(res.commit)
            .catch(res.error);
    }

    function update(req, res, next) {
        Tweet.findByIdAndUpdate(req.body.id, req.body)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'todo.not.found'))
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }

    function remove(req, res, next) {
        Tweet.findByIdAndRemove(req.params.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'todo.not.found'))
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }
};
