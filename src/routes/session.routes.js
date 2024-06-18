const { Router } = require('express');
const SessionController = require('../controllers/SessionController');
const ensureAuthentication = require('../middlewares/ensureAuthentication');
const SessionRoute = Router();
const sessionController = new SessionController();

SessionRoute.post('/create', sessionController.create);
SessionRoute.get('/index', ensureAuthentication, sessionController.index);

module.exports = SessionRoute;
