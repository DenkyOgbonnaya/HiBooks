const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

const{DB_USER, DB_PASS} = process.env;
const mongoDB = process.env.MONGODB_URI || `mongodb://${DB_USER}:${DB_PASS}@ds163694.mlab.com:63694/hibooks`; //'mongodb://localhost:27017/hellobooks'  

const connectToDb = () => { 
    mongoose.connect(mongoDB)
    .then(() => console.log('Connected to HiBooks db'))
    .catch(err => console.log(err));
}

module.exports = connectToDb;
