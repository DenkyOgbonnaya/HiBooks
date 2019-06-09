
const User= require('../model/user');
const Book = require('../model/book');
const RentedBook = require('../model/rentedBook');
const userPlan = require('../model/userPlan');
const notifications = require('./notifsController');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const bookController = {
    async addBook(req, res){
        const{title, author, about, category, quantity, language, publishedYear, pages, isbn} = req.body;
        const cover = req.file.filename;
        if(!cover)
            return res.status(400).send({message: 'No book cover selected'});

        try{
            const book = await Book.create({
                title,
                author,
                about,
                category,
                quantity,
                isbn,
                language,
                publishedYear,
                pages,
                cover: `/uploads/${cover}`
            })
            return res.status(201).send({status: 'success', message: 'new book added', book})

        }catch(err){
            return res.status(400).send(err);
        }
    },
    async getBooks(req, res){
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        
        try{
            const result = await Book.paginate({}, {page, limit});
            return res.status(200).send({
                books: {
                    data:result.docs,
                    page: result.page,
                    pages: result.pages,
                    total: result.total
                }
            })
        }catch(err){
            res.status(400).send(err)
        }
    },
    async updateBook(req, res){
        const{bookId} = req.params;
        try{
            const book = await Book.findByIdAndUpdate(bookId, {$set: req.body}, {new: true});
            return res.status(200).send({status: 'success', message: 'Book updated', book})
        }catch(err){
            res.status(400).send(err)
        }
    },
    async deleteBook(req, res){
        const{bookId} = req.params;

        try{
            const deleteBook = await Book.findByIdAndRemove(bookId)
            return res.status(200).send({message:'Book successfully deleted'});
        }catch(err){
            res.status(500).send(err);
        }
    
    },
    async getBook(req, res){
        const{bookId} = req.params;

        try{
            const book = await Book.findById(bookId)
            return res.status(200).send({book});
        }catch(err){
            res.status(500).send(err);
        }
    
    },
    async rentBook(req, res){
        const{userId} = req.params;
        const{bookId} = req.body;

        try{
            const token =  req.headers['authorization'].replace(/"/g, '');
            const {currentUser} = jwt.decode(token);

            const isRented = await RentedBook.findOne({borrower: userId, book: bookId, returned: false});
            if(isRented)
                return res.status(400).send({status: 'failed', message: 'You have already rented this book!'})

            const numBooksRented = await RentedBook.countDocuments({borrower: userId, returned: false});
            if(numBooksRented >= userPlan.maxBorrowing(currentUser.plan))
                return res.status(400).send({status: 'failed', message: 'You have reached your renting limit, upgrade plan or return a book to rent more'})
            
            const daysBeforeReturn = userPlan.validity(currentUser.plan);

            const rented = await RentedBook.create({
                book: bookId,
                borrower: userId,
                expectedReturn: moment().add(daysBeforeReturn, 'days').format('MMMM Do YYYY h:mm:ss a')
            })
            const book = await Book.findByIdAndUpdate(bookId, {$inc: {quantity: -1}})
            await notifications.createNotifs(currentUser._id, currentUser.name, book.title, 'rented');
            return res.status(200).send({status: 'success', message: `Book rented /n expectedReturn: ${rented.expectedReturn}`, });

        }catch(err){
            res.status(500).send(err)
        }
    },
    async getRentedBooks(req, res){
        const{userId} = req.params;
        const returned = req.query.returned || false;

        try{
            const rentedBooks = await RentedBook.find({borrower: userId, returned}).populate('book');
            if(rentedBooks.length > 0)
                return res.status(200).send({rentedBooks});
            return res.status(404).send({message: 'You have no rented books'});
        }catch(err){
            res.status(500).send(err)
        }
    },
    async returnBook(req, res){
        const{userId} = req.params;
        const {bookId} = req.body;

        try{
            const token =  req.headers['authorization'].replace(/"/g, '');
            const {currentUser} = jwt.decode(token);

            await RentedBook.findOneAndUpdate({book: bookId, borrower: userId}, {$set: {returned: true, ReturnDate: Date.now()}});
            const book = await Book.findByIdAndUpdate(bookId, {$inc: {quantity: 1}});

            await notifications.createNotifs(currentUser._id, currentUser.name, book.title, 'returned');
            return res.status(200).send({message: 'Book successfully returned', bookId: book._id});
        }catch(err){
            console.log(err)
            res.status(500).send(err);
        }
    },
    async searchBook(req, res){
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 2;
        const{search, category} = req.query;

        const query = {};
        if(search)
            query.title = {$regex: search, $options: 'i'};
        if(category && category !== 'All')
            query.category = category
        try{
            const result = await Book.paginate(query, {page, limit});
            
            if(result)
            return res.status(200).send({
                books: {
                    data:result.docs,
                    page: result.page,
                    pages: result.pages,
                    total: result.total
                }
            })
            return res.status(401).send({message: 'meal not found'})
        }catch(err){
            console.log(err)
            res.status(500).send(err);
        }
    },
}

module.exports = bookController;
