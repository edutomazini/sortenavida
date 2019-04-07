const biorritmo = require("../lib/biorritmo")
const moment = require('moment')

const arrBiorrtimoFisco = []
const dataAniversaio = moment('1974-08-25').format('YYYY-MM-DD')

for (let index = -7; index <= 30; index++) {
  arrBiorrtimoFisco.push(biorritmo.calcBiorritmo(moment().add(index, "days").format('YYYY-MM-DD'),dataAniversaio))
}

console.log(JSON.stringify(arrBiorrtimoFisco))
let melhorDia = 0
let melhorIdx = 0

let piorDia = 0
let piorIdx = 0

let melhorEmoc = 0
let melhorEmocIdx = 0

for (let index = 7; index < arrBiorrtimoFisco.length; index++) {
  const element = arrBiorrtimoFisco[index];
  if (element.soma > melhorDia){
    melhorIdx = index
    melhorDia = element.soma
  }
  if (element.soma < piorDia){
    piorIdx = index
    piorDia = element.soma
  }
  if (element.somaEmocIntelIntuit > melhorEmoc){
    melhorEmocIdx = index
    melhorEmoc = element.somaEmocIntelIntuit
  }
}

console.log ('melhor dia: ' + JSON.stringify(arrBiorrtimoFisco[melhorIdx]))
console.log ('pior dia: ' + JSON.stringify(arrBiorrtimoFisco[piorIdx]))
console.log ('melhor dia emo: ' + JSON.stringify(arrBiorrtimoFisco[melhorEmocIdx]))


