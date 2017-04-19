module.exports = (app) => {

    return (action) => {
        const restrictions = app.settings.acl.actions;
        const requiredAccessLevel = restrictions[action];


        return (req, res, next) => {

            let userAccessLevel = req.user.accessLevel;

            if(userAccessLevel > requiredAccessLevel) {
                return res.status(401).send('not.enough.rights');
            }

            next();

        }

    };

};