const Category = require('../model/category');

const categoryController = {
    async addCategory(req, res){
        const{name} = req.body;
        if(!name)
            return res.status(400).send({status: 'failed', message:'category is required'});
        try{
            const category = await Category.create({name});
            return res.status(201).send({status: 'success', category})
        }catch(err){
            res.status(400).send(err);
        }
    },
    async editCategory(req, res){
        const{name} = req.body;
        const{id} = req.params;
        if(!name)
            return res.status(400).send({status: 'failed', message:'category name is required'});
        try{
            const category = await Category.findByIdAndUpdate(id, {$set: {name}});
            return res.status(201).send({status: 'success', category})
        }catch(err){
            res.status(400).send(err);
        }
    },
    async getCategories(req, res){
        try{
            const categories = await Category.find({});
            return res.status(200).send({status: 'success', categories})
        }catch(err){
            res.status(400).send(err)
        }
    }
}

module.exports = categoryController;