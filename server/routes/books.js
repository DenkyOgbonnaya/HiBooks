const BookRouter = require('express').Router();
const bookController = require('../controllers/booksController');
const {multerUploads} = require('../controllers/imageUploder')
const {isLoggedIn, isAdmin, validateBookInputs, checkValidationResult} = require('../middlewares/validator');

const{
    addBook, 
    getBooks, 
    updateBook,
    getBook,
    deleteBook,
    rentBook,
    getRentedBooks,
    returnBook,
    searchBook
    } = bookController;
BookRouter.route('/books')
.post(isLoggedIn, isAdmin,  multerUploads, validateBookInputs, checkValidationResult, addBook)
.get(getBooks)
BookRouter.route('/books/:bookId')
.get(isLoggedIn, getBook)
.put(isLoggedIn, isAdmin,  validateBookInputs, checkValidationResult, updateBook)
.delete(isLoggedIn, isAdmin, deleteBook)

BookRouter.route('/users/:userId/books')
.post(isLoggedIn, rentBook)
.get(isLoggedIn, getRentedBooks)
.put(isLoggedIn, returnBook)

BookRouter.get('/book/search', searchBook);

module.exports = BookRouter;