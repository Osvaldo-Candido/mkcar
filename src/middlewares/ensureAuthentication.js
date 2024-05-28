const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const AuthConfig = require('../config/AuthConfig');

async function ensureAuthentication(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('json Web-token não informado', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, AuthConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
    };

    next();
  } catch {
    throw new AppError('JWT inválido');
  }
}

module.exports = ensureAuthentication;
