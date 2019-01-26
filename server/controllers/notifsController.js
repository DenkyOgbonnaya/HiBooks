const models = require('../model/models');

const createNotification = (userId, userName, bookTitle, type) =>{
    models.Notifications({
        userId,
        message: `${userName} ${type} book, "${bookTitle}".`,
        time: new Date().toDateString()
    }).save();
}
const getNotifs = () => {
    return models.Notifications.find({}).exec();
}

module.exports.createNotifs = createNotification;
module.exports.getNotifs = getNotifs;