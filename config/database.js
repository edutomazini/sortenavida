const knexfile = require('../example/knexfile')
const knex = require('knex')(knexfile)
module.exports = knex
