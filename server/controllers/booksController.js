const express = require('express'),
    bodyParser = require('body-parser'),
    models= require('../model/models'),
    bookService = express.Router(),
    verifyToken = require('./verifyToken'),
    userPlan = require('../model/userPlan'),
    notifications = require('./notifsController'),
    moment = require('moment');

    bookService.use(bodyParser.json());

bookService.get('/availableBooks', (req, res)=> {
     models.Books.find({quantity: {$gt:0}}, (err, books)=>{
        if(err) return res.status(500).send('Internal server error');
        if(!books) return res.status(401).send('No book is currently available');

        res.status(200).send(books);
    })
})
bookService.get('/rentedBooks/:userName', (req, res)=> {
    models.BorrowedBooks.find({borrower: req.params.userName}, (err, record)=>{
       if(err) return res.status(500).send('Internal server error');
       if(!record) return res.status(401).send('You currently have no borrowed books');

       res.status(200).send(record);
   })
})
bookService.get('/allBooks', (req, res)=> {
    models.Books.find({}, (err, books)=>{
        if(err) return res.status(500).send('Internal server error');
        res.status(200).send(books);
    })
})
bookService.post('/rentBook/:userId/:bookId', (req, res, next)=>{
    let returnDate;
    let data = {};
    Promise.all([
        models.Users.findById(req.params.userId),
        models.Books.findById(req.params.bookId)
    ])
    .then(([user, book]) => {
        data = {user, book};
        return models.BorrowedBooks.countDocuments({borrower: user.name}).exec()
    })
    .then(count => {
        const days = userPlan.validity(data.user.plan);
        if(count === userPlan.maxBorrowing(data.user.plan)){
            res.status(301).send({success: false, message: 'you have reached your maximum borrowing, consider'
                +' returning some books or upgrade your plan!'}
            )
            throw new Error('you cant borrow new book');
            
        }else
            return models.BorrowedBooks({
                book: data.book,
                borrower: data.user.name,
                dateBorrowed: new Date().toDateString(),
                expectedReturnDate: moment().add(days, 'days').format('MMMM Do YYYY h:mm:ss a')
            }).save()  
    })
    .then((borrowedBook)=> {
        notifications.createNotifs(data.user._id, data.user.name, data.book.title, 'rented');
        returnDate = borrowedBook.expectedReturnDate;
        return models.RentHistory({
            book:{
                title: borrowedBook.book.title,
                author: borrowedBook.book.author
                },
                borrower: borrowedBook.borrower,
                dateBorrowed: borrowedBook.dateBorrowed
        }).save()
    })
    .then(() =>{
            return models.Books.findOneAndUpdate({ISBN: data.book.ISBN}, {$inc: {quantity: -1}}).exec()
    })
    .then(() => {
        return res.status(200).send({
                message: `Book successfully borrowed. you are expected to return this book on ${returnDate}`, 
                success: true,
            })       
    }).catch(err => console.log('resolved') )    
            
})

bookService.get('/borrowedLog/:userName', (req, res)=>{
    models.RentHistory.find({borrower: req.params.userName}, (err, log)=>{
        if(err) return res.status(500).send('error getting log');
        res.status(200).send(log);
    })
})
bookService.delete('/return/:userName/:bookISBN', (req, res)=>{
    const{bookISBN, userName} = req.params;
    models.BorrowedBooks.findOneAndRemove({$and:[{'book.ISBN': bookISBN},  {borrower: userName}]})
    .then(() => {
        return models.Books.findOneAndUpdate({ISBN: req.params.bookISBN}, {$inc: {quantity: 1}})
    })
    .then((book) => {
        models.Users.findOne({name: userName}, (err, user)=>{
            if(err) throw err;

            notifications.createNotifs(user._id, user.name, book.title, 'returned');
            res.status(200).send({
            message: 'book returned',
            status: true
            });
        })
    })
    .catch(err => res.status(500).send(err) )

    })
bookService.get('/notifications', (req, res)=>{
    notifications.getNotifs().then(notifications => {
        res.status(200).send({success: true, notifications})
    })
    .catch(err => res.status(500).send({success:false, message: 'failed to get notifications'}))
})

module.exports = bookService;
