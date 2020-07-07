const User = require("../models/User");

module.exports = {
    getRegister(req, res) {
        res.render('users/register');
    },

    postRegister(req, res) {
        const { email, password, repeatPassword } = req.body;

        if(password === repeatPassword) {
            var user = new User({ email, password });
            user.save().then((data) => {
                console.log('Saved! ', data);
                res.redirect('login');
            }).catch((err) => {
                console.log('error: ' + err);
                res.render('users/register', { error: 'The email is exist!' });
            });
        } else {
            res.render('users/register', { error: 'The passwords not match' });
        }
    },

    getLogin(req, res) {
        res.render('users/login');
    },

    postLogin(req, res) {
        const { email, password } = req.body;

        User.findOne({ email: email, password: password }).then((user) => {
            if(user) {
                req.session.user = user.email;
                res.locals.user = user.email;
                req.session.save();
                res.redirect('/');
            } else {
                res.render('users/login', { error: 'The email or password is wrong!' });
            }
        }).catch((err) => {
            console.log(err);
        });
    },

    logout(req, res) {
        req.session.user = null;
        res.redirect('login');
    }
}