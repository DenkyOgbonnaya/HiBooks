const UserRouter = require('express').Router();
const userController = require('../controllers/userController');
const{validateCreateUser, validateLogin, validateProfile, checkValidationResult} = require('../middlewares/validator');

const{
    createUser,
    loginUser,
    updateProfile,
    changePassword,
    resetLink,
    passwordReset,
    resetPassword,
    nameExist,
    emailExist,
    contact

} = userController;

UserRouter.post('/signup', validateCreateUser, checkValidationResult, createUser)
UserRouter.post('/login', validateLogin, checkValidationResult, loginUser)
UserRouter.put('/:userId/profile', validateProfile, checkValidationResult, updateProfile)
UserRouter.put('/:userId/password', changePassword)
//the commented end points need a fix
/*UserRouter.get('/:email/reset', resetLink)
UserRouter.get('/passwordReset/:userId/:token', passwordReset)
UserRouter.put('/resetPassword', resetPassword)*/
UserRouter.get('/nameExist/:name', nameExist);
UserRouter.get('/emailExist/:email', emailExist);
UserRouter.post('/contact', contact);

module.exports = UserRouter;