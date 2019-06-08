const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check')

module.exports.validateBookInputs = validateBookInputs = [
    check('title', 'title is required').isLength({min: 3}),
    check('author', 'author is required').isLength({min: 3}),
    check('category', 'category is required').isLength({min: 3}),
    check('language', 'language is required').isLength({min: 3}),
    check('publishedYear', 'valid publishedYear is required').isNumeric().isLength({min: 4}),
    check('pages', 'pages must be a numeral').isNumeric().isLength({min: 1}),
    check('isbn', 'isbn must not be less than 13').isLength({min: 13}),
    check('quantity', 'quantity must be a numeral').isNumeric().isLength({min: 1}),
    check('about', 'about is required').isLength({min: 3}),
],
module.exports.checkValidationResult = checkValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty())
        return res.status(400).send({message: result.array()[0].msg})
    next();
}
module.exports.validateCreateUser = validateCreateUser = [
    check('name', 'name is required').isLength({min: 3}),
    check('email', 'valid email  is required').isEmail(),
    check('location', 'location is required').isLength({min: 3}),
    check('password', 'password is required').isLength({min: 3})

]
module.exports.validateLogin = validateLogin = [
    check('name', 'name is required').isLength({min: 3}),
    check('password', 'password is required').isLength({min: 3})

]
module.exports.validateProfile = validateProfile = [
    check('name', 'name is required').isLength({min: 3}),
    check('email', 'valid email  is required').isEmail(),
    check('location', 'location is required').isLength({min: 3}),
]

    /**
    * checks if it's an authorized user
    * @param req request object
    * @param res response object
    * @param next next middleware
    */
module.exports.isLoggedIn = isLoggedIn = (req, res, next) =>{
    const token = req.headers['authorization'] ? req.headers['authorization'].replace(/"/g, '') : '' // ? req.headers['authorization'].substring(7).replace(/"/g, '') : '';
    
    if(!token) return res.status(403 ).send({message: 'unauthorized user'})

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(err) {
        console.log(err);
            return res.status(401).send({message: 'unauthorized user.'})
        }
    
        next();
    });
}
/**
    * checks if logged in user is admin
    * @param req request object
    * @param res response object
    * @param next next middleware
    */
module.exports.isAdmin = isAdmin = (req, res, next) => {
    const token =  req.headers['authorization'] ? req.headers['authorization'].replace(/"/g, '') : '' //? req.headers['authorization'].substring(7).replace(/"/g, '') : '';
    const decoded = jwt.decode(token);

    if(decoded.currentUser.role !== 'ADMIN')
        return res.status(401).send({message: 'unauthorized user'})

    next();
}
