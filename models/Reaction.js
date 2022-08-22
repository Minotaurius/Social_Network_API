const { Schema, model, SchemaTypes, Types } = require('mongoose');
const moment = require('moment')

const reactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId
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
    }, 
    id: false
});

module.exports = reactionSchema