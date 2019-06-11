const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const transporter = require('./mailer');
const _ = require('lodash');
require('dotenv').config();

const userController = {
    async createUser(req, res){
        try{
            const{name, email, location, password} = req.body;
            const hashedPassword = bcrypt.hashSync(password, 8);
        
            const newUser = await User.create({
                name,
                email,
                location,
                password: hashedPassword
            }); 
            const token = jwt.sign(
                {currentUser: _.omit(newUser, "password") },
                process.env.SECRET_KEY,
                {expiresIn: '24h'} ) //24hrs
               
            return res.status(201).send({
                authenticated: true,
                token: token
            })
        }catch(err){
            res.status(500).send(err)
        }
        
    },
    async loginUser(req, res){
        const{name, password} = req.body;
        try{
            const user = await User.findOne({name});
            if(!user)
                return res.status(403).send({
                authenticated: false,
                message: 'incorrect email and password combination!'})
            
            const validPassword = bcrypt.compareSync(password, user.password);

            if(!validPassword)
                return res.status(403).send({
                    authenticated: false,
                    message: 'incorrect email and password combination'
                })
            const token = jwt.sign(
                {currentUser: _.omit(user, "password")},
                process.env.SECRET_KEY,
                {expiresIn: '24h'}
            )
            return res.status(200).send({authenticated: true, token})
        }catch(err){
            res.status(400).send(err);
        }
    },
    async verifyToken(req, res){
        const token = req.headers['authorization'] ? req.headers['authorization'].substring(7).replace(/"/g, '') : '';

        if(!token) return res.status(401 ).send({message: 'unauthorized user'})

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(err) 
            return res.status(401).send({status: 'failed', message: 'unauthorized user.'})
    
        res.status(200).send({status: 'success', token});
    });
    },
    async updateProfile(req, res){
        const{userId} = req.params;
        try{
          const updatedUser = await  User.findByIdAndUpdate(userId, {$set: req.body}, {new: true});
          const token = jwt.sign(
            {currentUser: _.omit(updatedUser, "password")},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        )
        return res.status(200).send({token})
        }catch(err){
            res.status(400).send(err);
        }
    },
    async changePassword(req, res){
        const{oldPassword, newPassword} = req.body;
        const{userId} = req.params;
        if(!oldPassword || !newPassword) return res.status(400).send({message: 'provide passwords'})
        try{
            const user = await User.findById(userId);
            if(!user)
                return res.status(401).send({message: 'Unauthorized'});
            const validPassword = bcrypt.compareSync(oldPassword, user.password);

            if(!validPassword)
                return res.status(401).send({message:'Unauthorized'})
           
            const hashedPassword = bcrypt.hashSync(newPassword, 8);
            await User.findByIdAndUpdate(userId, {$set: {password: hashedPassword}});
            return res.status(200).send({message: 'password changed successfully'});

        }catch(err){
            res.status(400).send(err);
        }
    },
    async resetLink(req, res){
        const{email} = req.params;
        try{
            const user = await User.findOne({email});
            if(!user)
                return res.status(400).send({message: 'Bad request'});

            const token = jwt.sign(
                {currentUser: _.pick(user, "email", "_id")},
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
                this link will expire in 24hrs, be sure to use it right away. <br />
                <a href= 'http://localhost:8080/api/users/resetPassword/${user._id}/${token}'>Reset password </a>
                <br /> Thank you for using HiBooks!. </p>`
            }
                const info = await transporter.sendMail(mailOptions);
                return res.status(200).send({status: 'success', message: 'A link has been sent to your mail to reset your password'});

        }catch(err){
            console.log(err)
            res.status(400).send(err);
        }
    },
    passwordReset(req, res){
        const{userId, token} = req.params;
            jwt.verify(token, process.env.SECRET_KEY , (err, decoded) => {
                if(err)
                    return res.redirect(`http://localhost:3000/error`)
                const{currentUser} = decoded;

                User.findById(userId)
                .then(user => {
                    if(!user)
                    return res.redirect(`http://localhost:3000/error`)

                res.redirect(`http://localhost:3000/passwordReset?email=${user.email}`);
                })
                .catch(err => {
                    res.redirect(`http://localhost:3000/error`)
                })
                
            })
    },
    async resetPassword(req, res){
        const{password, email} = req.body;

        if(!password) return res.status(400).send({message: 'enter a new password'})
        const hashedPassword = bcrypt.hashSync(password, 8);

        try{
            const user = await User.findOneAndUpdate({email}, {$set: {password: hashedPassword}});
            const token = jwt.sign(
                {currentUser: _.omit(user, "password")},
                process.env.SECRET_KEY,
                {expiresIn: '24h'}
            )
            return res.status(200).send({status: 'success', token})
        }catch(err){
            res.status(400).send(err)
        }
    },
    nameExist(req, res){
        User.findOne({name: req.params.name}, {password: 0})
        .then(user =>{
            if(!user){
                return res.status(200).send({
                    nameExist: false,
                    message: 'name Available'
                })
            }
            return res.status(200).send({
                nameExist: true,
                message: 'name taken, try another Name'
            })

        })
        .catch(err => res.status(500).send(err))
    },
    emailExist(req, res){
        User.findOne({email: req.params.email},{password: 0})
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
        .catch(err => res.status(500).send(err))
    },
    contact(req, res){
        const{name, email, message} = req.body;
        transporter.sendMail({
            from: process.env.USER,
            to: process.env.USER,
            subject: 'Contact at HiBooks',
            html: `<p>${message} <br /> from ${name}- ${email} </p>`
        })
        .then(info => {
            if(!info){
               return  res.status(500).send({success: false, message: 'fail to send mail' }) 
            }else
            res.status(200).send({success: true, message: 'Mail sent'})
        })
        .catch(err => { res.status(500).send(err)})
    }
}

     
 
module.exports= userController;