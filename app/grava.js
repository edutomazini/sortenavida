var loteriasCaixaJson = require('../index');
const path = require('path');
const fs = require('fs')
const db = require('../config/database')
const { asyncForEach } = require('../lib/util');

let diretorioTemporario = path.join('temp');

const dirtemp = path.join(`${__dirname}/`, '../temp')
if (!fs.existsSync(dirtemp)) {
  fs.mkdirSync(dirtemp, 0744);
  fs.mkdirSync(dirtemp+'/D_megase', 0744);
}

console.log('temp ' + dirtemp)
console.log(diretorioTemporario)

// Mega sena
 mega = async () => {
  return await loteriasCaixaJson.megaSena(diretorioTemporario)
    .then((jsonArray) => {
      return jsonArray
    }).catch((err) => {
      console.error(err);
    })
}

const start = async () => {
  const arrayConcursoMega = await mega()
  await gravaMegaSena(arrayConcursoMega);
  process.exit()
}

start()

async function gravaMegaSena (arrayConcursoMega) {
  await asyncForEach(arrayConcursoMega, async (concursoMega) => {
    let dbconcurso = await db('megasena').where('concurso', concursoMega.Concurso);
    if (dbconcurso.length === 0) {
      console.log('inserindo concurso ' + concursoMega.Concurso)
      await db('megasena').insert({
        concurso: concursoMega.Concurso,
        DataSorteio: concursoMega.DataSorteio,
        Dezena1: concursoMega.Dezena1,
        Dezena2: concursoMega.Dezena2,
        Dezena3: concursoMega.Dezena3,
        Dezena4: concursoMega.Dezena4,
        Dezena5: concursoMega.Dezena5,
        Dezena6: concursoMega.Dezena6,
        Arrecadacao_Total: concursoMega.Arrecadacao_Total,
        Ganhadores_Sena: concursoMega.Ganhadores_Sena,
        Rateio_Sena: concursoMega.Rateio_Sena,
        Ganhadores_Quina: concursoMega.Ganhadores_Quina,
        Rateio_Quina: concursoMega.Rateio_Quina,
        Ganhadores_Quadra: concursoMega.Ganhadores_Quadra,
        Rateio_Quadra: concursoMega.Rateio_Quadra,
        Acumulado: concursoMega.Acumulado,
        Valor_Acumulado: concursoMega.Valor_Acumulado,
        Estimativa_Premio: concursoMega.Estimativa_Premio,
        Acumulado_Mega_da_Virada: concursoMega.Acumulado_Mega_da_Virada,
      });
      let index = 0;
      let idCidade = 0;
      await asyncForEach(concursoMega.Cidade, async (cidade) => {
        index = index + 1;
        if (cidade != null && cidade != '') {
          let dbcidade = await db('cidade').where('cidade', cidade);
          if (dbcidade.length === 0) {
            dbcidade = await db('cidade').insert({
              cidade: cidade,
              uf: concursoMega.UF[index - 1]
            });
            idCidade = dbcidade[0];
          }
          else {
            idCidade = dbcidade[0].id;
          }
          let dbconcursocidade = await db('cidade_ganhadora')
            .where('id_cidade', idCidade)
            .andWhere('id_concurso', concursoMega.Concurso)
            .andWhere('tipo_concurso', 'MEGASENA');
          if (dbconcursocidade.length === 0) {
            await db('cidade_ganhadora').insert({
              id_cidade: idCidade,
              id_concurso: concursoMega.Concurso,
              tipo_concurso: 'MEGASENA',
              qtd: 1
            });
          }
          else {
            await db('cidade_ganhadora')
              .where('id_cidade', idCidade)
              .andWhere('id_concurso', concursoMega.Concurso)
              .andWhere('tipo_concurso', 'MEGASENA')
              .increment({
                qtd: 1
              });
          }
        }
      });
    }
  });
}
// Loto Fácil
/* loteriasCaixaJson.lotoFacil(diretorioTemporario)
  .then((jsonArray) => {
    // Retorno de todos os jogos da mega sena em formato json
    console.debug('--------- [ LOTO FACIL ] ---------');
    console.debug(jsonArray);
  }).catch((err) => {
    console.error(err);
  }); */