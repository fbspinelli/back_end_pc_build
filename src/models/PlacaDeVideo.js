import urls from '../config/dbUrls.js'
import axios from 'axios';
import helperString from '../helper/helperString.js'
const parenteses = new RegExp('([()])', 'ig');
const espacosEparenteses = new RegExp('([()])|\s', 'ig');
const regexSplit = new RegExp(' or | ou | / ', 'ig');


let listaPlacasBD;

async function obterListaPlacasBD(){
    if(listaPlacasBD === undefined){
        await axios.get(urls.getAllPlacasDeVideo).then((retorno) => {
            listaPlacasBD = retorno.data.items.map(placa => {
                placa.gpu = placa.gpu.replace(parenteses,'');
                return placa;
            })
        })
    }
    return listaPlacasBD;
}

async function pesquisaUmaPlacaNaListaBD(stringPlacaRequisito){
    await obterListaPlacasBD();
    stringPlacaRequisito = stringPlacaRequisito.replace(espacosEparenteses,'');
    let melhorCorrespondecia = 1;
    let melhoresResultados = [];
    listaPlacasBD.forEach(placa => {
        let resultadoAnalise = helperString.comparaDuasFrases(placa.gpu,stringPlacaRequisito);
        if(resultadoAnalise.quantidadePalavrasEncontrada >= melhorCorrespondecia){
            melhoresResultados.push({placa,resultadoAnalise});
            melhorCorrespondecia = resultadoAnalise.quantidadePalavrasEncontrada;
        }
    });
    melhoresResultados = melhoresResultados.filter(placaComAnalise => {
        if(placaComAnalise.resultadoAnalise.quantidadePalavrasEncontrada == melhorCorrespondecia){
            return placaComAnalise
        }
    })
    let resultado = melhoresResultados.reduce((anterior, atual) => {
        if(anterior.resultadoAnalise.quantidadePalavrasErradas < atual.resultadoAnalise.quantidadePalavrasErradas){
            return anterior;
        }
        else{
            return atual;
        }
    })
    return resultado.placa;
}

function retornaMelhorPlacaComCriterioLancamento (listaPlacasRequisitos){
    const date = new Date();
    const anoAtual = date.getFullYear();
    
    let placasAtendemCriterioAno = listaPlacasBD.filter(placa => placa.data_lancamento >= (anoAtual - 4))

    let placaMaisForte = listaPlacasRequisitos.reduce( (anterior, atual) => {
        return anterior.gflops < atual.gflops ? atual : anterior;
    })

    placasAtendemCriterioAno = placasAtendemCriterioAno.sort((anterior, atual) => {
        if (anterior.gflops > atual.gflops ) return 1;
        if (anterior.gflops < atual.gflops ) return -1;
        return 0;
    })
    return placasAtendemCriterioAno.find((placa) => placa.gflops >= placaMaisForte.gflops )
}

function converteRequisitosEmArrayComNomesPlacas (requisitos){
    let listaNomesPlacas = [];
    requisitos.forEach((requisito) => {
        let nomesPlacas = requisito.Gpu.split(regexSplit)
        nomesPlacas.forEach(nome => listaNomesPlacas.push(nome))
    })
    return listaNomesPlacas;
}

export default {
    pesquisaUmaPlacaNaListaBD,
    retornaMelhorPlacaComCriterioLancamento,
    converteRequisitosEmArrayComNomesPlacas
}
