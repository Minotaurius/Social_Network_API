const { Schema, model, SchemaTypes } = require('mongoose');


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.toString()
    },
    username: {
        type: String, 
        required: true
    },
    rections: [reactionSchema],
}, {
    toJSON: { //include any virtual properties on a client side request
        virtuals: true,
    }, 
    id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;