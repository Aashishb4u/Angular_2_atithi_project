var mongoose = require('mongoose');
mongoose.Promise = global.Promise
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {
        type: String,
        validate: /^[a-zA-Z_][a-zA-Z\\w]*/,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    token: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    }
});

var User = module.exports = mongoose.model('User', userSchema);
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports = mongoose.model('User', userSchema);
