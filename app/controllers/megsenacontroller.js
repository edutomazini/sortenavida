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
        .leftJoin('cidade', 'cidade.id', 'cidade_ganhadora.id_cidade')
        .where('cidade_ganhadora.id_concurso', concurso.concurso)
    })

    return res.send(megasena)

  } catch (err) {
    console.log(err)
    return res.status(400).send({ erro: 'Falha ao efetuar consulta.' + err })
  }
})

router.get('/dezenas', async (req, res) => {
  const { pagina, limit, campoordem, tipoordem } = req.query

  try {
    const maisSairam = await db('Dezenas').count('dezena as qtd').select('dezena').groupBy('dezena').orderBy('qtd', 'desc').limit(limit || 15)
    const menosSairam = await db('Dezenas').count('dezena as qtd').select('dezena').groupBy('dezena').orderBy('qtd', 'asc').limit(limit || 15)
    const maisSairamPremiado = await db('Dezenas').count('dezena as qtd').select('dezena').where('acumulado', 0).groupBy('dezena').orderBy('qtd', 'desc').limit(limit || 15)
    const menosSairamPremiado = await db('Dezenas').count('dezena as qtd').select('dezena').where('acumulado', 0).groupBy('dezena').orderBy('qtd', 'asc').limit(limit || 15)
    const maisSairamNaoPremiado = await db('Dezenas').count('dezena as qtd').select('dezena').where('acumulado', 1).groupBy('dezena').orderBy('qtd', 'desc').limit(limit || 15)
    const menosSairamNaoPremiado = await db('Dezenas').count('dezena as qtd').select('dezena').where('acumulado', 1).groupBy('dezena').orderBy('qtd', 'asc').limit(limit || 15)

    return res.send({ maisSairam, menosSairam, maisSairamPremiado, menosSairamPremiado, maisSairamNaoPremiado, menosSairamNaoPremiado })

  } catch (err) {
    console.log(err)
    return res.status(400).send({ erro: 'Falha ao efetuar consulta.' + err })
  }
})

module.exports = app => app.use('/app/megasena', router)