const express = require("express");
const connectToDb = require('./server/model/database');
const UserRouter = require("./server/routes/users");
const BookRouter = require('./server/routes/books');
const CategoryRouter = require('./server/routes/category');
const NotifsRouter = require('./server/routes/notification');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require("cors");
const path = require('path');
const{cloudinaryConfig} = require('./server/services/cloudinary_setup');

const app = express();

const port = process.env.PORT || 8080;
app.use(cors({credentials:true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use('*', cloudinaryConfig)
app.use(expressValidator());
app.use(UserRouter);
app.use(BookRouter)
app.use(CategoryRouter);
app.use(NotifsRouter);
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(__dirname + '/client/public'));
app.use(express.static(__dirname + '/public'));

app.options('*', cors());
app.use('/api/users', UserRouter);
app.use('/api', BookRouter);
app.use('/api', NotifsRouter);
app.use('/api', CategoryRouter);

connectToDb();

//listening port
app.listen(port, (err) =>{
    if(err) throw err ;
        console.log(`HiBooks listening on port ${port}`);
} );