// To used mogoose
const mongoose = require('mongoose')

// To used validator
const validator = require('validator')

// Create instruction schema
const userInfoSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'User'
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
        trim: true
    },
    height: {
        type: Number,
        trim: true,
        required: true,
    },
    weight: {
        type: Number,
        trim: true,
        required: true,
    },
    age: {
        type: Number,
        trim: true,
        required: true,
    },
    notes: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
        maxlength: 1000
    },
    payment: {
        type: Boolean,
        enum: [true, false],
        default: false
    }
}, { timestamps: true })


// Exports
const userInfo = mongoose.model('userInfo', userInfoSchema)
module.exports = userInfo