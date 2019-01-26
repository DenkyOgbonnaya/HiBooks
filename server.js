const express = require("express");
const AuthController = require("./server/controllers/authController");
const AdminService = require('./server/controllers/adminController');
const BookService = require('./server/controllers/booksController');
const ejs = require('ejs');
const cors = require("cors");
const path = require('path')

const app = express();

const port = process.env.PORT || 8080;
app.use(cors({credentials:true, origin: 'http://localhost:3000'}));
app.set('views', __dirname +'/server/views' )
app.set('view engine', 'ejs');
app.use(AuthController);
app.use(AdminService);
app.use(BookService);
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(__dirname + '/client/public'));

app.options('*', cors());
app.use('/api/users', AuthController);
app.use('/api/admin', AdminService);
app.use('/api/books', BookService);


//listening port
app.listen(port, (err) =>{
    if(err) throw err ;
        console.log(`hellobooks listening on port ${port}`);
} );