const moment = require('moment')

exports.calcBiorritmo = (data, dataNascimento) => {
  const dias = moment(data).diff(moment(dataNascimento), 'days')

  const bioFisico = bioformula(23, dias)
  const bioEmocional = bioformula(28, dias)
  const bioIntelectual = bioformula(33, dias)
  const bioIntuitivo = bioformula(38, dias)
  const soma = bioFisico + bioEmocional + bioIntelectual + bioIntuitivo
  const somaEmocIntelIntuit = bioEmocional + bioIntelectual + bioIntuitivo

  return { data, bioFisico, bioEmocional, bioIntelectual, bioIntuitivo, soma, somaEmocIntelIntuit }
  //return data + ',' + bioFisico + ',' + bioEmocional + ',' + bioIntelectual + ',' + bioIntuitivo
}

bioformula = (p, dias) => Math.sin((2 * Math.PI * dias) / p)
