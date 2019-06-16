const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

const{MDB_URL} = process.env;
const mongoDB = process.env.MONGODB_URI || MDB_URL; //'mongodb://localhost:27017/hellobooks'  

const connectToDb = () => { 
    mongoose.connect(mongoDB)
    .then(() => console.log('Connected to HiBooks db'))
    .catch(err => console.log(err));
}

module.exports = connectToDb;
