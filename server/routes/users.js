const UserRouter = require('express').Router();
const userController = require('../controllers/userController');
const{validateCreateUser, validateLogin, validateProfile, checkValidationResult} = require('../middlewares/validator');

const{
    createUser,
    loginUser,
    getUsers,
    updateProfile,
    changePassword,
    resetLink,
    passwordReset,
    resetPassword,
    nameExist,
    emailExist,
    contact,
    verifyToken

} = userController;

UserRouter.post('/signup', validateCreateUser, checkValidationResult, createUser);
UserRouter.post('/login', validateLogin, checkValidationResult, loginUser);
UserRouter.get('/verifyToken', verifyToken);
UserRouter.put('/:userId/profile', validateProfile, checkValidationResult, updateProfile);
UserRouter.put('/:userId/password', changePassword);
UserRouter.get('/:email/reset', resetLink);
UserRouter.get('/all', getUsers)

UserRouter.get('/resetPassword/:userId/:token', passwordReset)
UserRouter.put('/resetPassword', resetPassword)
UserRouter.get('/nameExist/:name', nameExist);
UserRouter.get('/emailExist/:email', emailExist);
UserRouter.post('/contact', contact);

module.exports = UserRouter;