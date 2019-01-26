
const express = require('express'),
    bodyParser = require('body-parser'),
    models= require('../model/models'),
    adminService = express.Router();

    adminService.use(bodyParser.json());

    adminService.post('/addBook', (req, res)=>{
        models.Books.findOneAndUpdate({ISBN: req.body.ISBN}, {$inc: {quantity: req.body.quantity}}, (err, doc)=>{
            if(err) return res.status(500).send('internal server error');
            if(doc){
                return res.status(200).send('book added');
            }
                models.Books(req.body).save((err, book) =>{
                    if(err) 
                        return res.status(500).send('error adding book');
                    
                    return res.status(200).send({
                        message: 'Book added',
                        book: book,
                        status: true
                    });
                })
            
        })
    })
    adminService.put('/modify/:bookId', (req, res)=>{
        models.Books.findOneAndUpdate({_id: req.params.bookId}, {$set: req.body}, (err)=>{
            if(err) return res.status(500).send('error modifying book');
            res.status(200).send('Book modified');
        })
    })
    adminService.delete('/delete/:bookId', (req, res)=>{
        models.Books.findOneAndRemove({_id:req.params.bookId}, (err)=>{
            if(err) return res.status(500).send('Could not delete book');
            res.status(200).send('Book deleted');
        })
    })
    
module.exports= adminService;