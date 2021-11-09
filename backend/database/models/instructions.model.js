// To used mogoose
const mongoose = require('mongoose')

// To used validator
const validator = require('validator')

// Create instruction schema
const instructionSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'User'
    },
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
        maxlength: 1000
    },
    fileName: {
        type: String,
        trim: true,
        required: true,
    },
    filePath: {
        type: String,
        trim: true,
    }
}, { timestamps: true })


// Exports
const Instructions = mongoose.model('Instructions', instructionSchema)
module.exports = Instructions