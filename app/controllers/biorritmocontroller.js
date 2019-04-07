const express = require('express')
const bio = require('../biorritmo')

const router = express.Router()
router.get('/', async (req, res) => {
  const dataaniversario = req.query.dataaniversario

  try {
    const biorritmo = bio.biorritmo(dataaniversario)

    return res.send(biorritmo)
  } catch (err) {
    console.log(err)
    return res.status(400).send({ erro: 'Falha ao efetuar consulta.' })
  }
})

module.exports = app => app.use('/app/biorritmo', router)