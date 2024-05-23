const { Router } = require('express');

const UserRoutes = Router();

UserRoutes.get('/', (request, response) => {
  return response.json();
});

module.exports = UserRoutes;
