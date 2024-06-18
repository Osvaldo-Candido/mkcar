const { Router } = require('express');
const UserController = require('../controllers/UserController');

const UserRoutes = Router();
const userController = new UserController();

UserRoutes.get('/', userController.index);
UserRoutes.post('/create', userController.create);
UserRoutes.put('/update/:id', userController.update);

module.exports = UserRoutes;  
