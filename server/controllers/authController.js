const mongoose = require("mongoose"),
    express = require('express'),
    bodyParser = require('body-parser'),
    models = require('../model/models'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    transporter = require('./mailer');
    verifyToken = require('./verifyToken'),
    connectToDb = require('../model/database');
    auth = express.Router();
    require('dotenv').config();

auth.use(bodyParser.json());
connectToDb();

auth.post("/signUp", (req, res, next)=> {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        models.Users({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: hashedPassword,
            role: "USER",
            plan: "silver"

        }).save((err, user)=>{
            if(err) 
                return res.status(500).send("There was a problem registring user");
            
            //create a token
            const token = jwt.sign(
                {currentUser: user},
                process.env.SECRET_KEY,
                {expiresIn: 86400} ) //24hrs
               
            return res.status(201).send({
                authenticated: true,
                token: token
            })
        })

    });
    auth.get("/verifyUser",verifyToken, (req, res)=>{
        res.status(200).send({
            authenticated: true,
            token: res.locals.token
        })
    });
    auth.post("/login", (req, res)=> {
        //check if user is registered
        models.Users.findOne({name: req.body.name}, (err, user)=>{
            if(err)
                return res.status(500).send('internal server error')
            if(!user){
                return res.status(202).send({
                    message:'Username or Password inCorrect',
                    authenticated:false
                });
            }
            const validPassword = bcrypt.compareSync(req.body.password, user.password);
            if(!validPassword)
                return res.status(202).send({authenticated: false, message: 'incorrect Username or password'})
            
            const token = jwt.sign(
                {currentUser: user},
                process.env.SECRET_KEY,
                {expiresIn: 86400}
            )
            return res.status(201).send({ 
                token: token,
                authenticated: true
            })
        })

    })
    auth.put('/editProfile/:userId', (req, res) =>{
        models.Users.findByIdAndUpdate(req.params.userId, {$set: req.body.newData}, {new: true})
        .then(user => {
            const token = jwt.sign(
                {currentUser: user},
                process.env.SECRET_KEY,
                {expiresIn: 86400}
            )
            return token
        })
        .then(token => {
            return res.status(201).send({message: 'profile edited', token: token})
        })
        .catch(err => res.status(500).send('something went wrong'))
    })

    auth.put('/changePassword/:userId', verifyToken, (req, res) => {
        models.Users.findById(req.params.userId)
        .then(user => {
           const validPassword = bcrypt.compareSync(req.body.oldPassword, user.password);

           if(!validPassword)
                return res.status(403).send({
                    success: false,
                    message:'you do not have valid access to change this password!'
                })
           
            const hashedPassword = bcrypt.hashSync(req.body.newPassword, 8);
            models.Users.findByIdAndUpdate(req.params.userId, {$set: {password: hashedPassword}}, err=>{
                if(err)
                    return res.status(500).send({success: false, mwssage: 'internal server error'})
                return res.status(201).send({
                    success: true,
                    message: 'password successfully changed!'
                })
            })
        })
        .catch(err => res.status(500).send(err))
    })
    auth.get('/passwordReset/:email', (req, res) => {
        const {email} = req.params
        if(email){
            models.Users.findOne({email}, {password: 0})
            .then(user => {
                if(user){
                   const token = jwt.sign(
                        {currentUser: user},
                        process.env.SECRET_KEY,
                        {expiresIn: '24h'}
                    )
                    const mailOptions = {
                        from: process.env.USER,
                        to: email,
                        subject: 'Password Recovery at HiBooks.herokuapp.com',
                        html: `<h3>Hi ${user.name} </h3><br/>
                        <p>You recently requested for a password reset. click on the
                        link below to reset your password, ignore if it wasn't you. Please bear in mind
                        this link will expire in 1hr, be sure to use it right away. <br />
                        <a href= 'http://localhost:8080/api/users/resetPassword/${user._id}/${token}'>Reset password </a>
                        <br /> Thank you for using HiBooks!. </p>`
                        
                    }
                    return mailOptions
                }
                return res.status(403).send({success: fales, message: 'Sorry we cant find your Account'})
            })
            .then(mailOptions =>{
                return transporter.sendMail(mailOptions)
            })
            .then(info => {
                res.status(200).send({success:true, message: 'A link has been sent to your mail to reset your password'})
            })
            .catch(err => {
                res.status(500).send({
                    success: false, 
                    message: "couldn't send mail, please try again later"
                }) 
            })
        }else
        return res.status(403).send({success: false, message: 'provide an email address'})
    });

    auth.get('/resetPassword/:id/:token', (req, res) => {
        const{id, token} = req.params
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) =>{
            if(err)
                return res.render('errorpage', {status: 403,message: 'Ooops! the reset link has expired' })

            const{currentUser} = decoded;
            models.Users.findById(currentUser._id, {password:0}, (err, user) =>{
                if(err){
                    res.render('errorpage', {status: 401,message: 'sorry you do not have an account with HiBooks' }) 
                }else
                res.render('passwordreset', {userEmail: user.email});
            });
        });
    });

    auth.post('/resetPassword', (req, res) => {
        const{password, userEmail} = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);

        models.Users.findOneAndUpdate({email: userEmail}, {$set:{password: hashedPassword}})
        .then((user) => {
            console.log(user)
            const token = jwt.sign(
                {currentUser: user},
                process.env.SECRET_KEY,
                {expiresIn: '24h'}
            )
            const homePage = "<a href= 'http://localhost:3000/'>Go home </a>"
            res.status(201).send({
                success: true,
                token: token, 
                message:`Password  reset successfully, ${homePage} `})
        })
        .catch(err => console.log(err));
    })

    auth.get('/nameExist/:name', (req, res) => {
        models.Users.findOne({name: req.params.name}, {password: 0})
        .then(user =>{
            if(!user){
                return res.status(200).send({
                    userNameExist: false,
                    message: 'name Available'
                })
            }
            return res.status(200).send({
                userNameExist: true,
                message: 'name taken, try another Name'
            })

        })
        .catch(err => res.status(500).send('error occoured while getting name'))
    })
    auth.get('/emailExist/:email', (req, res) => {
        models.Users.findOne({email: req.params.email},{password: 0})
        .then(user =>{
            if(!user){
                return res.status(200).send({
                    emailExist: false,
                    message: 'This email is avaailable'
                })
            }
            return res.status(200).send({
                emailExist: true,
                message: 'This email has already been used, Try another'
            })

        })
        .catch(err => res.status(500).send('error occoured while getting name'))
    })

    auth.post('/contact', (req, res) => {
        const{name, email, message} = req.body;
        transporter.sendMail({
            from: process.env.USER,
            to: process.env.USER,
            subject: 'Message from HiBooks',
            html: `<p>${message} <br /> from ${name}- ${email} </p>`
        })
        .then(info => {
            if(!info){
               return  res.status(500).send({success: false, message: 'fail to send mail' }) 
            }else
            res.status(200).send({success: true, message: 'Mail sent'})
        })
        .catch(err => { res.status(500).send('internal server error')})
    })
       
 
module.exports= auth;