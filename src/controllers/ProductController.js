const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class ProductController {
  async index(request, response) {
    const products = await knex.select('*').from('products');
    if (!products) {
      throw new AppError('Sem productos');
    }

    return response.json(products);
  }

  async create(request, response) {
    const { name, mark, model, description, price, km } = request.body;
    const image = request.file.filename;
    const user_id = request.user.id;

    try {
      const [id_product] = await knex('products').insert({
        id_user: user_id,
        name,
        mark,
        model,
        description,
        price,
        km,
      });

      await knex('images').insert({ image, id_product, id_user: user_id });
    } catch {
      throw new AppError('Falha ao carregar o post!');
    }

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, mark, model, description, price, km } = request.body;
    const user_id = request.user.id;
    const { id } = request.params;

    const product = await knex('products').where({ id }).first();

    if (user_id !== product.id_user) {
      throw new AppError('Usuário não permitido fazer alteração');
    }

    await knex('products')
      .where({ id })
      .update({ name, mark, model, description, price, km });

    return response.json({ product });
  }

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;
    const product = await knex('products').where({ id }).first();

    if (user_id !== product.id_user) {
      throw new AppError('Usuário não permitido fazer alteração');
    }

    await knex('products').delete({ id });

    return response.json();
  }
}

module.exports = ProductController;
