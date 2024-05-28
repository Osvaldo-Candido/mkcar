const { Router } = require('express');
const UserRoutes = require('./user.routes');
const ProductsRoutes = require('./product.routes');
const SessionRoute = require('./session.routes');

const routes = Router();

routes.use('/users', UserRoutes);
routes.use('/products', ProductsRoutes);
routes.use('/session', SessionRoute);

module.exports = routes;
