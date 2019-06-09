const NotifRouter = require('express').Router();
const notifController = require('../controllers/notifsController');
const validation = require('../middlewares/validator');

const{getNotifs, getUserNotif} = notifController;
const{isLoggedIn, isAdmin} = validation;

NotifRouter.route('/notifications')
.get(isLoggedIn, isAdmin, getNotifs)

NotifRouter.route('/notifications/:userId')
.get(isLoggedIn, getUserNotif)

module.exports = NotifRouter;;