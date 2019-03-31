var loteriasCaixaJson = require('./../index');
var path = require('path');
var fs = require('fs');

let diretorioTemporario = path.join('temp');

// Mega sena
loteriasCaixaJson.megaSena(diretorioTemporario)
  .then((jsonArray) => {
    // Retorno de todos os jogos da mega sena em formato json
    /* console.debug('--------- [ MEGA SENA ] ---------');
    console.log(jsonArray.cidade)*/
    var json = JSON.stringify(jsonArray);
    fs.writeFile("c:/temp/myjsonfile.json", json, function (err) {
      if (err) {
        return console.log(err);
      }
    });
    //console.log(jsonArray); 
  }).catch((err) => {
    //console.error(err);
  });

// Loto Fácil
/* loteriasCaixaJson.lotoFacil(diretorioTemporario)
  .then((jsonArray) => {
    // Retorno de todos os jogos da mega sena em formato json
    console.debug('--------- [ LOTO FACIL ] ---------');
    console.debug(jsonArray);
  }).catch((err) => {
    console.error(err);
  }); */