const mongoose = require('mongoose');

const QuotesSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: [true, " is required"],
        minlength: [3, " must be at least 3 characters"]
    }
}, { timestamps: true })

const AuthorSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, "First name is required"],
        minlength: [3, "First name must be at least 3 characters"]
    },
    quotes: [QuotesSchema]
}, { timestamps: true })


module.exports.Author = mongoose.model('Author', AuthorSchema)