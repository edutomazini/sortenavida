const path = require('path');
const libMegaSena = require('./lib/mega-sena')
const libLotoFacil = require('./lib/loto-facil');

const express = require('express')
var cors = require('cors')
var cookieParser = require('cookie-parser')

const app = express()

require('./app/controllers/index')(app)

const megaSena = async (tempDirectory) => {
  return libMegaSena.downloadResultadosMegaSena(path.normalize(tempDirectory))
    .then((nomeArquivoComResultados) => {
      return libMegaSena.htmlToJson(nomeArquivoComResultados);
    })
};

const lotoFacil = (tempDirectory) => {
  return libLotoFacil.downloadResultadosLotoFacil(path.normalize(tempDirectory))
    .then((nomeArquivoComResultados) => {
      return libLotoFacil.htmlToJson(nomeArquivoComResultados);
    });
};

module.exports = { megaSena, lotoFacil }

app.use('/', express.static(path.join(__dirname, 'public')))
  .use(cors())
  .use(cookieParser())

var port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('localhost:' + port)
})