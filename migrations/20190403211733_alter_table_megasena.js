
exports.up = function (knex, Promise) {
  return knex.schema.alterTable('megasena', function(table) {
    table.primary('concurso')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('megasena', function(table) {
    table.dropPrimary('PRIMARY')
  })
};