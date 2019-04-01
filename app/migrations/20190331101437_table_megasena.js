
exports.up = function (knex, Promise) {
  return knex.schema.createTable('megasena', table => {
    table.increments('id').primary()
    table.timestamps(true, true)
    table.integer('concurso').unsigned().notNullable()
    table.date('DataSorteio')
    table.integer('Dezena1').unsigned().notNullable()
    table.integer('Dezena2').unsigned().notNullable()
    table.integer('Dezena3').unsigned().notNullable()
    table.integer('Dezena4').unsigned().notNullable()
    table.integer('Dezena5').unsigned().notNullable()
    table.integer('Dezena6').unsigned().notNullable()
    table.decimal('Arrecadacao_Total', 13, 2)
    table.integer('Ganhadores_Sena').unsigned()
    table.decimal('Rateio_Sena', 13, 2)
    table.integer('Ganhadores_Quina').unsigned()
    table.decimal('Rateio_Quina', 10, 2)
    table.integer('Ganhadores_Quadra').unsigned()
    table.decimal('Rateio_Quadra', 10, 2)
    table.boolean('Acumulado')
    table.decimal('Valor_Acumulado', 13, 2)
    table.decimal('Estimativa_Premio', 13, 2)
    table.decimal('Acumulado_Mega_da_Virada', 13, 2)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('megasena')
}
