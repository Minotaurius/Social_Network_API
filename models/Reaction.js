const { Schema, Types } = require('mongoose');
const moment = require('moment')

const reactionSchema = new Schema ({
    reactionId: {
        type: Types.ObjectId,
        default: Types.ObjectId
    }, 
    reactionbody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: moment()
    }
}, {
    toJSON: { //include any virtual properties on a client side request
        virtuals: true,
        getters: true
    }, 
    id: false
});

module.exports = reactionSchema;