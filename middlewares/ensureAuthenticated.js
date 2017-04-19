const jwt = require('jsonwebtoken');

module.exports = (app) => {
  const Token = app.models.Token;
  const User = app.models.User;

  return (req, res, next) => {
    let authorization = req.headers['authorization'];

    if (!authorization)
        return unauthorized();

    return verifyToken()
        .then(app.utils.ensureOne)
        .catch(app.utils.reject(403, 'invalid.token'))
        .then(findAssociatedUser)
        .then(app.utils.ensureOne)
        .catch(app.utils.reject(403, 'invalid.user'))
        .then(setUser)
        .then(next)
        .catch(unauthorized);

    function verifyToken(){
      return new Promise((resolve, reject) => {
        jwt.verify(authorization, app.settings.security.salt,
          function(err, decryptedToken) {
            if (err)
              return reject(err);
            return resolve(decryptedToken);
          }
        );
      })
    }

    function findAssociatedUser(decryptedToken) {
      return User.findById(decryptedToken.data.userId)
    }

    function setUser(user) {

        req.userId = user._id;

    }

    function unauthorized(){
        return res.status(401).send('unauthorized');
    }
  };
};
