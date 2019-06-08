const CategoryRouter = require('express').Router();
const categoryControler = require('../controllers/categoryController');
const validator = require('../middlewares/validator')

const{addCategory, getCategories, editCategory} = categoryControler;
const{isLoggedIn, isAdmin} = validator;

CategoryRouter.route('/categories')
.post(isLoggedIn, isAdmin, addCategory)
.get(getCategories)

CategoryRouter.route('/categories/:id')
.put(isLoggedIn, isAdmin, editCategory)

module.exports = CategoryRouter;