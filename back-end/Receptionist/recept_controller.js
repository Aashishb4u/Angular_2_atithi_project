/**
 * USER (Receptionist) controller
 */

var User = require('./recept_model');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var crypto = require('crypto');
var validator = require('email-validator');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var session = require('express-session');
app.set('superSecret', config.secret);
var Passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var errorMessages = require('../helpers/validationMessages');

/**
 * Add USER api by fetching email and password from UI and returns auth_token in headers.
 * @param req
 * @param res
 */

var addUser = function (req, res) {
    //Adding a User API
    var email = req.body.email;
    var validEmail = validator.validate(email);

    if (!req.body.name && !req.body.password && !req.body.email) {
        res.status(errorMessages.CLIENT_ERROR).send(errorMessages.EMPTY_FIELD_ERROR);
    }
    else if (req.body.password.length < 10) {
        res.status(errorMessages.SERVER_ERROR).send(errorMessages.PASSWORD_LENGTH_ERROR);
    }
    else if (req.body.password !== req.body.confirm_password) {
        res.status(errorMessages.SERVER_ERROR).send(errorMessages.PASSWORD_MISMATCH_ERROR);
    }

    else {
        // create a  user
        var user = new User();
        user.name = req.body.name,
            user.password = crypto.createHash('sha1')
                .update(req.body.password)
                .digest('base64'),
            user.email = req.body.email
        if (!validEmail) {
            res.status(errorMessages.CLIENT_ERROR).send(errorMessages.EMAIL_ERROR);
        }
        else if (isNaN(req.body.name)) {
            user.save(function (err) {
                if (err) {
                    res.status(errorMessages.CLIENT_ERROR).send(errorMessages.USER_EXIST_ERROR);

                } else {
                    var token = jwt.sign(user, app.get('superSecret'), {
                        expiresIn: 86400// expires in 24 hours
                    });
                    user.token = token;
                    user.name = req.body.name;
                    user.save();
                    res.status(errorMessages.SUCCESS).send({token: token});
                }
            });
        }
    }
}

/**
 * used passport for validations.
 */

Passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
    function (username, password, done) {
        var comparePass = crypto.createHash('sha1').update(password).digest('base64');
        User.findOne({
            email: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: errorMessages.NOT_A_USER_ERROR});
            }
            if (user.password != comparePass) {
                return done(null, false, {message: errorMessages.WRONG_PASSWORD_ERROR});

            }
            return done(null, user);
        });

    }));

Passport.serializeUser(function (user, done) {
    done(null, user.id);
});

Passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

/**
 * API to login USER and send token for authentication.
 * @type {Function}
 */

var loginUser = (function (req, res, next) {
    Passport.authenticate('local', function (err, user) {
        if (err) {
            res.status(errorMessages.SERVER_ERROR).send(errorMessages.INTERNAL_SERVER_ERROR);
        } else if (!user) {
            res.status(errorMessages.CLIENT_ERROR).send(errorMessages.NOT_A_USER_ERROR);
        }
        else {
            user.token = null;
            user.save();
            var token = jwt.sign(user, app.get('superSecret'), {
                expiresIn: 86400
            });
            user.token = token;
            user.save();
            res.status(errorMessages.SUCCESS).send({
                'token': token,
                user: user
            });
        }
    })(req, res, next);

});

var userController = {
    addUser: addUser,
    loginUser: loginUser
};

module.exports = userController;