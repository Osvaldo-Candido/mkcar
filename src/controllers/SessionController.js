const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const { compare } = require('bcryptjs');
const AuthConfig = require('../config/AuthConfig');
const { sign } = require('jsonwebtoken');
class SessionController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex('users').where({ email }).first();

    if (!user) {
      throw new AppError('Email ou password inválido');
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new AppError('Senha errada');
    }

    const { expiresIn, secret } = AuthConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.json({ token, user });
  }

  async index(request, response) {
    const id = request.user.id;

    const user = await knex('users').where({ id }).first();

    if (!user) {
      throw new AppError('Usuário inválido', 401);
    }

    return response.json({ user });
  }
}

module.exports = SessionController;
