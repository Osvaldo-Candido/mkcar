exports.up = (knex) =>
  knex.schema.createTable('images', (table) => {
    table.increments('id');
    table.text('image');
    table
      .integer('id_product')
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');
    table
      .integer('id_user')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.createTable('images');
