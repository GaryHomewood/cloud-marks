var Strategy   = require('passport-local').Strategy;
var User = require('../models/user.js');

module.exports = function(passport) {
    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function(id, cb) {
        User.findById(id, function (err, user) {
            if (err) { return cb(err); }
            cb(null, user);
        });
    });

    passport.use('local-login', new Strategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, cb) {
            User.findByEmail(email, function(err, user) {
                if (err) { return cb(err); }
                if (!user) { return cb(null, false, req.flash('loginMessage', 'No user found.')); }
                if (password != process.env.PASSWORD) { return cb(null, false, req.flash('loginMessage', 'Invalid password.')); }
                return cb(null, user);
            });
        }));
};
