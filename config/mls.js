module.exports = {
    auth(req, res, next) {
        const user = req.session.user;
        res.locals.user = user;
        console.log(user);
        if(!user) {
            res.redirect('/users/login');
        } else {
            next();
        }
    },

    setUserData(req, res, next) {
        if(req.session.user) {
            res.locals.user = req.session.user;
        }
    
        next();
    }
}