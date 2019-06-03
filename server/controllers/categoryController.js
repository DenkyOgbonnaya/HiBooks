const Category = require('../model/category');

const categoryController = {
    async addCategory(req, res){
        const{name, description} = req.body;
        if(!name)
            return res.status(400).send({message:'category is required'});
        try{
            const category = await Category.create({name, description});
            return res.status(201).send({category})
        }catch(err){
            res.status(400).send(err);
        }
    },
    async getCategories(req, res){
        try{
            const categories = await Category.find({});
            return res.status(200).send({categories})
        }catch(err){
            res.status(400).send(err)
        }
    }
}

module.exports = categoryController;