
exports.up = function (knex, Promise) {
  return knex.schema.createTable('cidade_ganhadora', table => {
    table.increments('id').primary()
    table.timestamps(true, true)
    table.integer('id_cidade').unsigned()
    table.integer('id_concurso').unsigned()
    table.integer('qtd').unsigned()
    table.string('tipo_concurso', 15) //MEGASENA, QUINA, LOTOFACIL, ETC.
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('cidade_ganhadora')
}
