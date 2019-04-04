
exports.up = function (knex, Promise) {
  return knex.schema.alterTable('megasena', function(table) {
    table.dropColumn('id')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('megasena', function(table) {
      table.increments('id').primary()
  })
};