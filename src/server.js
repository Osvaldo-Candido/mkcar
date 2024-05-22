const express = require('express');

const api = express();

const PORT = 333;
api.listen(PORT, () => {
  console.log(`Carregado porta ${PORT}`);
});
