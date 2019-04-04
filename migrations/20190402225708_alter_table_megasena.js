
exports.up = function (knex, Promise) {
  return knex.schema.alterTable('megasena', function(table) {
      table.string('responsavel', 100)
      table.string('obs', 100)
      table.string('veiculo', 100)
      table.integer('id_cidade_sorteio').unsigned()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('megasena', function(table) {
      table.dropColumn('responsavel')
      table.dropColumn('obs')
      table.dropColumn('veiculo')
      table.dropColumn('id_cidade_sorteio')
  })
};