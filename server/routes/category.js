const CategoryRouter = require('express').Router();
const categoryControler = require('../controllers/categoryController');

const{addCategory, getCategories} = categoryControler;

CategoryRouter.route('/categories')
.post(addCategory)
.get(getCategories)

module.exports = CategoryRouter;