const Notification = require('../model/notification');

const createNotification = (userId, userName, bookTitle, type) =>{
    Notification({
        userId,
        message: `${userName} ${type} book, "${bookTitle}".`,
        time: Date.now()
    }).save();
}
const getNotifs = () => {
    return models.Notifications.find({}).exec();
}

module.exports.createNotifs = createNotification;
module.exports.getNotifs = getNotifs;