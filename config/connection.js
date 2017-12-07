var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var config   = require('./database');

mongoose.connect(config.database, function(err, db) {
  if(err) {
    console.log("We are not connected " );
  }
    else {
        console.log("We are connected to Database : " + config.dataBaseName);
    }
});

module.exports.connectiondb = mongoose.connect;