# HiBooks
Hibooks is a simple application that manages a library and it processes like stocking, finding, renting and returning books. Library users can find, rent and return books, and library administrators can add, edit or remove books in the library.

[Live Demo](https://hibooks.herokuapp.com)

*user= 'admin' pass= 'admin'*

## Installations 
Your must have Node.js and NPM installed to run this app locally
```
1 Git clone this repository
2 cd to cloned repo root directory
3 run npm install to install all dependencies
4 run node server.js to start server
5 open another terminal and cd to projects client directory
6 run npm install to install clients dependencies
7 run npm start to start client server
8 visit http://localhost:3000 on your browser to view app.
```

## Features
The following features were implemented.
**Authentication & Authorization**
This application uses json web token (jwt) to authenticate and authorize users on both client and server side. When a user succefully logs into the application, a unique jwt with a brief life span is generated on the server and sent to the client, which is stored on the client and must be used to making subsequent server calls.

**Library Users**
Library users are able to:
- Sign up to the application
- Login 
- See all books in the Library
- Review a books details
- Rent and Return books (as prescribed by the users membership plan)
- View their profile, Rented books and rent/return logs
- Edit their profile, change password and reset password (forgot password feature)
- Log out of the application

**Library Admins**
Library administrators enjoys all the privilages of a libraray user, and in addition can:
- Add book, modify book information and delete books
- Add category and categorize books
- Recieve notifications on all rented and returned books
- Manage library users.

## Tech Stack
This application was built with the following technologies:
- React.js: This is a Javascript front-end component base library for building declearative User Interface
- Redux: This was used to manage application state.
- Reactstrap: Reactstrap provides a prebuilt Bootstrap 4 components that allow a great deal of flexibility,    this was use to build beautiful and responsive UI.
- Node.js: Node.js is a server side javascript runtime environment for running javascript on the server.
- Express.js: Express.js is a Node.js framework for builing RESTful apis.
-MongoDb/Mongoose: MongoDB is a cross-platform document oriented NoSQL database use to persist application data.

## Sample enviroment configurations
- USER='me@gmail.com'
- USER_PASS='mygmailpassword'
- SECRET_KEY='mysecrerekey'
- MDB_URL='mongodb://'DB_USER':'DB_PASS'@example.mlab.com:6923/hibooks'
- DB_PASS='mlabpassword'
Find more in the .env.sample file