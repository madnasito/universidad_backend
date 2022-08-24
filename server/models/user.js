const mongoose = require("mongoose")
let Schema = mongoose.Schema
const uniqueValidator = require("mongoose-unique-validator")

var userSchema = new Schema({
    name: {
        type: String,
        required: [true, '\nThe Name is required']
    },
    username: {
        type: String,
        required: [true, "\nThe Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "\nThe email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "\nThe password is required"]
    },
    status: {
        type: Boolean,
        default: true
    },
    matches: [{
        type: Schema.Types.ObjectId,
        ref: 'Match'
    }],
    victories: {
        type: Number,
        default: 0
    },
    losses: {
        type: Number,
        default: 0
    },
    match: {
        type: Number,
        default: 0
    }
})

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject()
    delete userObject.password
    return userObject
}

userSchema.plugin(uniqueValidator, {
    message: '\n The {PATH} should be unique, there is another user using it'
})

module.exports = mongoose.model("User", userSchema)