const NotifRouter = require('express').Router();
const notifController = require('../controllers/notifsController');

const{getNotifs} = notifController;

NotifRouter.route('/notifications')
.get(getNotifs)

module.exports = NotifRouter;;