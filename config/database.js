const knexfile = require('../app/knexfile')
const knex = require('knex')(knexfile)
module.exports = knex
