const { Schema, model, SchemaTypes } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String, 
        unique: true,
        required: true,
        trimmed: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please make sure to use a valid email address."]
    }, 
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought",
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"   
    }]
}, {
    toJSON: { //include any virtual properties on a client side request
        virtuals: true,
    }, 
    id: false
}
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model("User", userSchema);

module.exports = User