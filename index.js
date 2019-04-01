const path = require('path');
const libMegaSena = require('./lib/mega-sena')
const libLotoFacil = require('./lib/loto-facil');


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