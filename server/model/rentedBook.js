const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentedBookSchema = new Schema({
    book: {type: mongoose.Schema.ObjectId, ref: 'Book'},
    dateRented: {
        type: Date,
        default: Date.now()
    },
    expectedReturn: Date,
    returned: {
        type: Boolean,
        default: false
    },
    returnDate: Date,
    borrower: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('RentedBook', rentedBookSchema);