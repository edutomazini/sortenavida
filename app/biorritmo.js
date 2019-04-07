const biorritmo = require("../lib/biorritmo")
const moment = require('moment')
const inicio = 7

exports.biorritmo = (dataAniversaio) => {
  console.log('data nascimento ' + dataAniversaio)
  const arrBiorrtimo = [];

  for (let index = inicio * -1; index <= 30; index++) {
    arrBiorrtimo.push(biorritmo.calcBiorritmo(moment().add(index, "days").format('YYYY-MM-DD'), moment(dataAniversaio).format('YYYY-MM-DD')));
  }

  let melhorDia = 0;
  let melhorIdx = 0;
  let piorDia = 0;
  let piorIdx = 0;
  let melhorEmoc = 0;
  let melhorEmocIdx = 0;

  for (let index = inicio; index < arrBiorrtimo.length; index++) {
    const element = arrBiorrtimo[index];
    if (element.soma > melhorDia) {
      melhorIdx = index;
      melhorDia = element.soma;
    }
    if (element.soma < piorDia) {
      piorIdx = index;
      piorDia = element.soma;
    }
    if (element.somaEmocIntelIntuit > melhorEmoc) {
      melhorEmocIdx = index;
      melhorEmoc = element.somaEmocIntelIntuit;
    }
  }
  const arrMelhorDia = [{ melhorIdx: melhorIdx, array: arrBiorrtimo[melhorIdx] }]
  const arrPiorDia = [{ piorIdx: piorIdx, array: arrBiorrtimo[piorIdx] }]
  const arrMelhorEmoc = [{ melhorEmocIdx: melhorEmocIdx, array: arrBiorrtimo[melhorEmocIdx] }]

  return { arrBiorrtimo, arrMelhorDia, arrPiorDia, arrMelhorEmoc };
  //return arrBiorrtimo
}