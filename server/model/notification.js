const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    userId: String,
    message: String,
    time: Date
})

module.exports = mongoose.model('Notification', notificationSchema);