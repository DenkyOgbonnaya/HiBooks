const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
name: String,
location: String,
email: String,
password: String,
role: String,
plan:  String,
})
const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    publishedYear: Number,
    pages: Number,
    quantity: Number,
    language: String,
    ISBN: Number,
    category: String,
    about: String

})
const borrowedBooksSchema= mongoose.Schema({
        book:{
            title: String,
            author: String,
            publishedYear: Number,
            pages: Number,
            language: String,
            ISBN: Number,
            category: String
        },
        borrower:  String,
        dateBorrowed: String,
        expectedReturnDate:String
})
const rentHistorySchema = mongoose.Schema({
    book:{
        title: String,
        author: String,
     },
     borrower: String,
     dateBorrowed: String
})
const notificataionSchema = mongoose.Schema({
    userId: String,
    message: String,
    time: String
})


const Users = mongoose.model('Users', userSchema);
const Books = mongoose.model('Books', bookSchema);
const BorrowedBooks = mongoose.model('BorrowedBooks', borrowedBooksSchema);
const RentHistory = mongoose.model('RentHistory', rentHistorySchema)
const Notifications = mongoose.model('Notifications', notificataionSchema);

module.exports.Users = Users;
module.exports.Books = Books;
module.exports.BorrowedBooks= BorrowedBooks;
module.exports.RentHistory = RentHistory;
module.exports.Notifications = Notifications;
