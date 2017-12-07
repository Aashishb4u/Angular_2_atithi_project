var express = require('express');
var User = require('../Receptionist/recept_model');
var Guest = require('./guestmodel');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
var errorMessages = require('../helpers/validationMessages');
var validator = require('email-validator');
var config = require('../config/database');
app.set('superSecret', config.secret);


var addGuest = function (req, res) {
    console.log(req.body);
    var in_time = req.body.in_time;
    var out_time = req.body.out_time;
    var validEmail = validator.validate(req.body.email);

    if ((req.body.name && req.body.email && req.body.phone_no)) {

        User.find({token: req.headers.token}, function (err, users) {
            if (err) {
                errorDisplay;
            }
            else if (users.length === 0) {

                res.status(errorMessages.CLIENT_ERROR).send(errorMessages.NOT_A_USER_ERROR);
            } else {
                jwt.verify(req.headers.token, app.get('superSecret'), function (err) {
                    console.log(req.headers.token);

                    if (err) {
                        res.status(errorMessages.CLIENT_ERROR).send(errorMessages.SESSION_EXPIRED_ERROR);

                    }
                    else {
                        if (isNaN(req.body.phone_no)) {
                            res.status(errorMessages.CLIENT_ERROR).send(errorMessages.PHONE_NO_ERROR);
                        } else {
                            if (isNaN(req.body.name)) {
                                if (req.body.phone_no.toString().length === 10) {
                                    if (validEmail) {
                                        //If email is valid
                                        var visitor = new Guest({
                                            name: req.body.name,
                                            email: req.body.email,
                                            phone_no: req.body.phone_no,
                                            user_id: users[0]._id,
                                            in_time: Date.now(),
                                            out_time: Date.now()
                                        });
                                        //visitor has been created.
                                        visitor.save(function (err) {

                                            if (err) {
                                                console.log("err", err);
                                                res.status(errorMessages.SERVER_ERROR).send(errorMessages.INTERNAL_SERVER_ERROR);
                                            } else {
                                                res.status(errorMessages.SUCCESS).send(visitor);
                                            }
                                        });
                                    }
                                    else {
                                        res.status(errorMessages.CLIENT_ERROR).send(errorMessages.EMAIL_ERROR);
                                    }

                                } else {
                                    res.status(errorMessages.CLIENT_ERROR).send(errorMessages.NAME_ERROR);
                                }
                            } else {
                                res.status(errorMessages.CLIENT_ERROR).send(errorMessages.PHONE_NO_ERROR);
                            }
                        }
                    }
                });
            }

        });

    } else {
        res.status(errorMessages.CLIENT_ERROR).send(errorMessages.EMPTY_FIELD_ERROR);
    }


};

var getAllGuests = function (req, res) {
    var reqToken = req.headers.token;
    var tokens = {};
    var userid = {};
    var isAdmin;
    var username;
    User.find({token: reqToken}, function (err, users) {
        if (err) {
            res.status(errorMessages.SERVER_ERROR).send(errorMessages.INTERNAL_SERVER_ERROR);
        }

        else if (users.length === 0) {
            res.status(errorMessages.CLIENT_ERROR).send(errorMessages.USER_NOT_FOUND_ERROR);
        }
        else {

            // verifies secret and checks exp.
            jwt.verify(reqToken, app.get('superSecret'), function (err) {
                if (err) {
                    res.status(errorMessages.CLIENT_ERROR).send(errorMessages.SESSION_EXPIRED_ERROR);
                }
                else {
                    //it returns array output.
                    userid = users[0]._id;
                    tokens = users[0].token;
                    isAdmin = users[0].admin;
                    username = users[0].name;

                }
                if (tokens === reqToken) {
                    if (isAdmin == true) {
                        Guest.find({is_active: true})
                            .populate('user_id')
                            .exec(function (err, visitors) {
                                if (err) {
                                    res.status(errorMessages.SERVER_ERROR).send(errorMessages.INTERNAL_SERVER_ERROR);
                                }
                                else if (visitors.length === 0) {
                                    res.status(errorMessages.CLIENT_ERROR).send(errorMessages.VISITOR_NOT_FOUND_ERROR);
                                }
                                else {
                                    res.status(errorMessages.SUCCESS).send({visitors: visitors});

                                }
                            });

                    } else {

                        console.log('userid', userid);
                        Guest.find({user_id: userid, is_active: true}, function (err, visitors) {
                            if (err) {

                                res.status(errorMessages.SERVER_ERROR).send(errorMessages.INTERNAL_SERVER_ERROR);
                            }
                            else if (visitors.length === 0) {
                                res.status(errorMessages.CLIENT_ERROR).send(errorMessages.VISITOR_NOT_FOUND_ERROR);
                            }
                            else {
                                res.status(errorMessages.SUCCESS).send({visitors: visitors});

                            }
                        });
                    }
                }
            });
        }
    });
};

var getGuestById = function (req, res) {
    //get visitor by ID API
    console.log("put id with route-url");
    var id = req.params.id;
    var myToken = req.headers.token;
    var dbtoken = {};
    User.find({token: myToken}, function (err, users) {
        if (err) {

            res.status(errorMessages.SERVER_ERROR).send(errorMessages.INTERNAL_SERVER_ERROR);
        } else if (users.length === 0) {

            res.status(errorMessages.CLIENT_ERROR).send(errorMessages.USER_NOT_FOUND_ERROR);
        }
        else {
            jwt.verify(myToken, app.get('superSecret'), function (err) {
                if (err) {

                    res.status(errorMessages.CLIENT_ERROR).send(errorMessages.SESSION_EXPIRED_ERROR);
                }
                else {
                    dbtoken = users[0].token;
                }
                if (dbtoken === myToken) {
                    Guest.find({'_id': id, is_active: true}, function (err, visitors) {
                        if (err) {

                            res.status(errorMessages.SERVER_ERROR).send(errorMessages.INTERNAL_SERVER_ERROR);
                        }
                        else {
                            if (visitors.length === 0) {

                                res.status(errorMessages.CLIENT_ERROR).send(errorMessages.VISITOR_NOT_FOUND_ERROR);
                            }
                            else {
                                res.status(errorMessages.SERVER_ERROR).send(visitors);
                            }
                        }
                    });
                }
                else {
                    res.status(errorMessages.CLIENT_ERROR).send(errorMessages.USER_NOT_FOUND_ERROR);
                }
            });
        }
    });

};

var deleteGuest = function (req, res) {

    var id = req.params.id;
    var myToken = req.headers.token;
    var dbtoken = {};
    User.find({token: myToken}, function (err, users) {
        if (err) {

            res.status(errorMessages.SERVER_ERROR).send(errorMessages.INTERNAL_SERVER_ERROR);
        }
        else if (users.length !== 0) {
            jwt.verify(myToken, app.get('superSecret'), function (err) {

                if (err) {

                    res.status(errorMessages.CLIENT_ERROR).send(errorMessages.SESSION_EXPIRED_ERROR);

                }
                else {
                    dbtoken = users[0].token;
                }
                if (dbtoken === myToken) {
                    Guest.find({'_id': id}, function (err, visitors) {
                        if (err) {

                            res.status(errorMessages.SERVER_ERROR).send(errorMessages.INTERNAL_SERVER_ERROR);
                        }
                        else {
                            visitors[0].remove();
                            res.send(visitors[0]);
                        }
                    });
                }
            });
        }
    });

};

var updateGuest = function (req, res) {
    var id = req.body._id;
    var myToken = req.headers.token;
    var body = req.body;
    var dbtoken = {};
    var validEmail = validator.validate(req.body.email);
    var counter = 0;
    User.find({token: myToken}, function (err, users) {
        if (err) {
            res.status(errorMessages.SERVER_ERROR).send(errorMessages.INTERNAL_SERVER_ERROR);
        } else if (users.length === 0) {
            res.status(errorMessages.CLIENT_ERROR).send(errorMessages.USER_NOT_FOUND_ERROR);
        }
        else {
            jwt.verify(req.headers.token, app.get('superSecret'), function (err) {
                if (err) {

                    res.status(errorMessages.CLIENT_ERROR).send(errorMessages.SESSION_EXPIRED_ERROR);

                }
                else {
                    dbtoken = users[0].token;
                }
                if (dbtoken === myToken) {
                    Guest.find({'_id': id},
                        function (err, visitor) {
                            if (err) {
                                res.status(errorMessages.SERVER_ERROR).send(errorMessages.INTERNAL_SERVER_ERROR);
                            } else if (visitor.length !== 0) {
                                if (body.name && body.email && body.phone_no) {
                                    if (isNaN(body.name) && body.name.length !== 0) {
                                        if (validEmail) {
                                            if (body.phone_no.toString().length == 10) {

                                                visitor[0].name = body.name;
                                                visitor[0].email = body.email;
                                                visitor[0].phone_no = body.phone_no;
                                                visitor[0].save();
                                                res.send(visitor[0]);
                                            }
                                            else {

                                                res.status(errorMessages.CLIENT_ERROR).send(errorMessages.PHONE_NO_ERROR);
                                            }

                                        } else {

                                            res.status(errorMessages.CLIENT_ERROR).send(errorMessages.EMAIL_ERROR);

                                        }
                                    }
                                    else {

                                        res.status(errorMessages.CLIENT_ERROR).send(errorMessages.NAME_ERROR);

                                    }

                                } else {
                                    res.status(errorMessages.CLIENT_ERROR).send(errorMessages.EMPTY_FIELD_ERROR);

                                }
                            } else {

                                res.status(errorMessages.CLIENT_ERROR).send(errorMessages.VISITOR_NOT_FOUND_ERROR);

                            }

                        });
                }
                else {

                    res.status(errorMessages.CLIENT_ERROR).send(errorMessages.USER_NOT_FOUND_ERROR);

                }
            });
        }
    });
};

var userCheckOut = function (req, res) {
    // User Logout API.
    var id = req.body._id;
    var myToken = req.headers.token;
    var dbtoken = {};
    User.find({token: myToken}, function (err, users) {
        if (err) {

            res.status(errorMessages.SERVER_ERROR).send(errorMessages.INTERNAL_SERVER_ERROR);

        }
        else if (users.length !== 0) {
            jwt.verify(myToken, app.get('superSecret'), function (err) {

                if (err) {

                    res.status(errorMessages.CLIENT_ERROR).send(errorMessages.SESSION_EXPIRED_ERROR);
                }
                else {
                    dbtoken = users[0].token;
                }
                if (dbtoken === myToken) {
                    Guest.find({'_id': id}, function (err, visitors) {
                        if (err) {

                            res.status(errorMessages.SERVER_ERROR).send(errorMessages.INTERNAL_SERVER_ERROR);
                        }
                        else {
                            // user outtime will be generated
                            visitors[0].out_time = null;
                            visitors[0].save();
                            visitors[0].out_time = Date.now();
                            res.send(visitors[0]);

                        }
                    });
                }
            });
        }
    });

};


var guestController = {

    addGuest: addGuest,
    getAll: getAllGuests,
    getGuestById: getGuestById,
    deleteGuestById: deleteGuest,
    userCheckOut: userCheckOut,
    updateGuest: updateGuest
};

module.exports = guestController;

