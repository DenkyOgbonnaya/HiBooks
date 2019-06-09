const Notification = require('../model/notification');

module.exports.createNotification = createNotification = (userId, userName, bookTitle, type) =>{
    Notification({
        userId,
        message: `${userName} ${type} book, "${bookTitle}".`,
        time: Date.now()
    }).save();
}
module.exports.getNotifs = async function getNotifs(req, res){
    const limit = 20;
    try{
        const notifications = await Notification.find({}).sort({time: 'desc'}).limit(limit)
        return res.status(200).send({notifications})
    }catch(err){
        res.status(400).send(err)
    }
}

module.exports.getUserNotif = async function getUserNotif(req, res){
    const{userId} = req.params;
    constlimit = 10
    try{
        const notifications = await Notification.find({userId}).sort({time: 'desc'}).limit(limit)
        return res.status(200).send({notifications})
    }catch(err){
        res.status(400).send(err)
    }
}