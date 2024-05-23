const express = require('express');
const routes = require('./routes');

const api = express();
api.use(routes);

const PORT = 333;
api.listen(PORT, () => {
  console.log(`Carregado porta ${PORT}`);
});
