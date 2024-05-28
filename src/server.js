require('express-async-errors');
const AppError = require('./utils/AppError');
const cors = require('cors');
const express = require('express');
const routes = require('./routes');
const sqlConnection = require('./database/sqlite');

const api = express();
api.use(express.json());
api.use(cors());
api.use(routes);
sqlConnection();

api.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }
  console.log(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const PORT = 3333;
api.listen(PORT, () => {
  console.log(`Carregado porta ${PORT}`);
});
