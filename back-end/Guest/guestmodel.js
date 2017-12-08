/**
 * Visitor Schema
 */

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var visitorSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        phone_no: {
            type: Number,
            min: 10,
            unique: true

        },
        in_time: {
            type: Date, 
            default: Date.now()
        },
        out_time: {
            type: Date,
            default: Date.now()
        },
        user_id: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'User'
        },
        is_active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    });
module.exports = mongoose.model('Visitor', visitorSchema);