var userRouter = require('./routes/route');
var visitorRouter = require('./routes/route');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var app = express();
var router = express.Router();
var Passport = require('passport');
var config = require('./config/database');
var connect_me = require("./config/connection");

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/authentication', userRouter);
app.use('/api/visitor', visitorRouter);
app.use(Passport.initialize());
app.use(Passport.session());

// variable port for deciding a port number
var port = process.env.PORT || 8080;

//this is Middle-ware which shows message when we will route.
router.use(function (req, res, next) {
    console.log('We are routing');
    next();
});

app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

connect_me.connectiondb;
// for connection

app.listen(port);
//For listening operations on ports.

console.log("Server running on " + port + " port");

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Credentials', 'true   ');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Key,HeaderName,AnotherHeaderName, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next()
});