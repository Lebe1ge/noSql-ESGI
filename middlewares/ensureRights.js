module.exports = (app) => {

    return (action) => {

        const User = app.models.User;
        const Project = app.models.Project;
        const Team = app.models.Team;

        return (req, res, next) => {

            if(action.typeId == "project") {

                Project.findById(req.params.id)
                    .then(app.utils.ensureOne)
                    .catch(app.utils.reject(404, 'project.not.found'))
                    .then(getProjectTeam)
                    .then(app.utils.ensureOne)
                    .catch(app.utils.reject(404, 'team.not.found'))
                    .then(getUserRole)
                    .catch(app.utils.reject(404, 'user.not.found'))
                    .then(isUserCan)
                    .then(next);

            }else{

                Team.findById(req.params.id)
                    .then(app.utils.ensureOne)
                    .catch(app.utils.reject(404, 'team.not.found'))
                    .then(getUserRole)
                    .catch(app.utils.reject(404, 'user.not.found'))
                    .then(isUserCan)
                    .then(next)
                    .catch(res.error);
            }
        };


        function getProjectTeam(project) {

            console.log(project);

        }

        function getUserRole(team) {



        }

        function isUserCan(userRole) {
            const roles = app.settings.acl.roles;
            const restrictions = app.settings.acl.actions;

            const requiredAccessLevel = restrictions[action.action];
            let userAccessLevel = roles[userRole].level;

            if (userAccessLevel > requiredAccessLevel) {
                return res.status(401).send('not.enough.rights');
            }
        }
    };

};