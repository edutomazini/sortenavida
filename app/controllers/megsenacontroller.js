const express = require('express')
const db = require('../../config/database')
const router = express.Router()
const { asyncForEach } = require('../../lib/util')

router.get('/', async (req, res) => {
  
  const { pagina, limit, campoordem, tipoordem } = req.query

  const tipoOrdem = tipoordem || 'asc'
  const campoOrdem = campoordem || 'concurso'
  const to = Number(pagina) || 1
  const perPage = Number(limit) || 50

  try {
    const megasena = await db.select('*').from('megasena')
    .orderBy(campoOrdem, tipoOrdem)
    .paginate((perPage > 100 ? 100 : perPage), to, true)

    await asyncForEach(megasena.data, async (concurso) => {
      concurso.cidadesGanhadoras = await db.select('cidade.cidade', 'cidade.uf',
        'cidade_ganhadora.qtd').from('cidade_ganhadora')
        .leftJoin('cidade','cidade.id', 'cidade_ganhadora.id_cidade')
        .where('cidade_ganhadora.id_concurso', concurso.concurso)
    })

    return res.send(megasena)

  } catch (err) {
    console.log(err)
    return res.status(400).send({ erro: 'Falha ao efetuar consulta.' + err})
  }
})

module.exports = app => app.use('/app/megasena', router)