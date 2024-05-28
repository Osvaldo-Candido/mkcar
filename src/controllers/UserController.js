const knex = require('../database/knex');
const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError');
const { request } = require('express');

class UserController {
  async index(request, response) {}

  async create(request, response) {
    const { name, birthday, country, city, number_phone, email, password } =
      request.body;

    const checkEmail = await knex('users').where({ email }).first();

    if (checkEmail) {
      throw new AppError('Este email já possui usuário');
    }

    if (
      !name ||
      !birthday ||
      !country ||
      !city ||
      !number_phone ||
      !email ||
      !password
    ) {
      throw new AppError('Preencha todos os campos');
    }

    const hashPassword = await hash(password, 8);

    await knex('users').insert({
      name,
      birthday,
      country,
      city,
      number_phone,
      email,
      password: hashPassword,
    });

    return response.status(201).json({});
  }

  async update(request, response) {
    const {
      name,
      birthday,
      country,
      city,
      number_phone,
      email,
      password,
      old_password,
    } = request.body;
    const { id } = request.params;

    const user = await knex('users').where({ id }).first();

    if (!user) {
      throw new AppError('Usuário inválido');
    }

    if (password && !old_password) {
      throw new AppError('Por favor informa a senha anterior');
    }

    if (password && old_password) {
      const passwordCompare = await compare(old_password, user.password);
      if (!passwordCompare) {
        throw new AppError('A senha antiga informada não está informada');
      }

      user.password = await hash(password, 8);
    }

    await knex('users').where({ id }).update({
      name,
      birthday,
      country,
      city,
      number_phone,
      email,
      password: user.password,
      // created_at: DATETIME('now'),
    });

    return response.json(user);
  }
}

module.exports = UserController;
