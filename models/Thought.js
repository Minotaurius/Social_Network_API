const { Schema, model, SchemaTypes } = require('mongoose');
const reactionSchema = require('./Reaction')


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]

}, {
    toJSON: { //include any virtual properties on a client side request
        virtuals: true,
        getters: true
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;