
exports.up = function (knex, Promise) {
  return knex.schema.createTable('cidade', table => {
    table.increments('id').primary()
    table.string('cidade', 150)
    table.string('uf', 2)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('cidade')
}
