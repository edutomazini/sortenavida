const moment = require('moment')

exports.calcBiorritmo = (dataIni, dataNascimento) => {
  const dias = moment(dataIni).diff(moment(dataNascimento), 'days')
  //console.log('dias ' + dias)
  const bioFisico = bioformula(23, dias)
  const bioEmocional = bioformula(28, dias)
  const bioIntelectual = bioformula(33, dias)
  const bioIntuitivo = bioformula(38, dias)
  const soma = bioFisico + bioEmocional + bioIntelectual + bioIntuitivo
  const somaEmocIntelIntuit = bioEmocional + bioIntelectual + bioIntuitivo
  //console.log('fisico: ' + bioFisico)
  //console.log('bioEmocional: ' + bioEmocional)
  //console.log('bioIntelectual: ' + bioIntelectual)
  //console.log('bioIntuitivo: ' + bioIntuitivo)

  return { dataIni, bioFisico, bioEmocional, bioIntelectual, bioIntuitivo, soma, somaEmocIntelIntuit }
}

bioformula = (p, dias) => Math.sin((2 * Math.PI * dias) / p)
