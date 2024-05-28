const { Router } = require('express');
const SessionController = require('../controllers/SessionController');

const SessionRoute = Router();
const sessionController = new SessionController();

SessionRoute.post('/create', sessionController.create);

module.exports = SessionRoute;
