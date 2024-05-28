const { text } = require('express');

exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.text('name');
    table.text('birthday');
    table.text('country');
    table.text('city');
    table.text('number_phone');
    table.text('email');
    table.text('password');

    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable('users');
