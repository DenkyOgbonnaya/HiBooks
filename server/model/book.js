const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    created: {
        type : Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Book', bookSchema);