const sha1 = require('sha1');

module.exports = (app) => {
  const User = app.models.User

  return {
    create,
    list,
    show,
    update,
    remove
  }

  function create(req, res, next){
    let user = new User(req.body);

    User.findOne({
      email: req.body.email
    })
      .then(app.utils.ensureEmpty)
      .catch(app.utils.reject(403, 'user.already.exists'))
      .then(createUser)
      .then(res.commit)
      .catch(res.error)

      function createUser(){
        user.password = sha1(user.password);
        return user.save();
      }

  }

  function list(req, res, next){
    User.find()
      .then(res.commit)
      .catch(res.error)
  }

  function show(req, res, next){
    User.findById(req.params.id)
      // .populate('todos')
      .then(app.utils.ensureOne)
      .catch(app.utils.reject(404, 'user.not.found'))
      .then(res.commit)
      .catch(res.error)
  }

  function update(req, res, next){
    User.findByIdAndUpdate(req.body.id, req.body)
      .then(app.utils.ensureOne)
      .catch(app.utils.reject(404, 'user.not.found'))
      .then(res.commit)
      .catch(res.error)
  }

  function remove(req, res, next){
    User.findByIdAndRemove(req.params.id)
      .then(app.utils.ensureOne)
      .catch(app.utils.reject(404, 'user.not.found'))
      .then(app.utils.empty)
      .then(res.commit)
      .catch(res.error)
  }

}
