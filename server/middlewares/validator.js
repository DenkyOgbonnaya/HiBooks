const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check')

module.exports.validateBookInputs = validateBookInputs = [
    check('title', 'title is required').not().isEmpty(),
    check('author', 'author is required').isEmpty(),
    check('category', 'category is required').isEmpty(),
    check('language', 'language is required').isEmpty(),
    check('publishedYear', 'valid publishedYear is required').isEmpty(),
    check('pages', 'pages is required').isEmpty(),
    check('isbn', 'isbn is required').isEmpty(),
    check('quantity', 'quantity must be an integer').isEmpty(),
    check('about', 'about is required').isEmpty(),
],
module.exports.checkValidationResult = checkValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty())
        return res.status(400).send(result.array()[0].msg)
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
    console.log(req.body)
    const token = req.headers['authorization'] ? req.headers['authorization'].substring(7).replace(/"/g, '') : '';

    if(!token) return res.status(403 ).send({message: 'unauthorized user'})

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(err) 
            return res.status(401).send({message: 'unauthorized user.'})
    
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
    const token =  req.headers['authorization'] ? req.headers['authorization'].substring(7).replace(/"/g, '') : '';
    const decoded = jwt.decode(token);

    if(decoded.currentUser.role !== 'ADMIN')
        return res.status(401).send({message: 'unauthorized user'})

    next();
}
