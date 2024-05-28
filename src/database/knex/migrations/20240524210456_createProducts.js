exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.increments('id');
    table.integer('id_user').references('id').inTable('users');
    table.text('name');
    table.text('model');
    table.text('mark');
    table.text('description');
    table.text('price');
    table.text('id_categorie').references('id').inTable('categories');
    table.text('km');

    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable('products');
