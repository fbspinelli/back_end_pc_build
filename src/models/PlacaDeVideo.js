import urls from '../config/Urls.js'
import axios from 'axios';
import helperString from '../helper/helperString.js'
const parenteses = new RegExp('([()])', 'ig');
const regexSplit = new RegExp(' or | ou |/|,|\\|', 'ig');


let cache = {
    listaPlacasBD:undefined
}; 

async function obterListaPlacasBD(){
    if(cache.listaPlacasBD === undefined){
        await axios.get(urls.getAllPlacasDeVideo).then((retorno) => {
            cache.listaPlacasBD = retorno.data.items.map(placa => {
                placa.gpu = placa.gpu.replace(parenteses,'');
                return placa;
            })
        })
    }
    return cache.listaPlacasBD;
}

async function pesquisaUmaPlacaNaListaBD(stringPlacaRequisito){
    if (stringPlacaRequisito === null || stringPlacaRequisito === undefined){
        return null;
    }
    await obterListaPlacasBD();
    stringPlacaRequisito = stringPlacaRequisito.replace(parenteses,'');
    let melhorCorrespondecia = 1;
    let melhoresResultados = [];
    cache.listaPlacasBD.forEach(placa => {
        let resultadoAnalise = helperString.comparaDuasFrases(placa.gpu,stringPlacaRequisito);
        if(resultadoAnalise.quantidadePalavrasEncontrada >= melhorCorrespondecia){
            melhoresResultados.push({placa,resultadoAnalise});
            melhorCorrespondecia = resultadoAnalise.quantidadePalavrasEncontrada;
        }
    });
    if(melhoresResultados.length === 0)return null;
    melhoresResultados = melhoresResultados.filter(placaComAnalise => {
        if(placaComAnalise.resultadoAnalise.quantidadePalavrasEncontrada === melhorCorrespondecia){
            return placaComAnalise
        }
    })
    melhoresResultados = melhoresResultados.sort((anterior, atual) => {
        if (anterior.placa.gflops > atual.placa.gflops ) return 1;
        if (anterior.placa.gflops < atual.placa.gflops ) return -1;
        return 0;
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
    
    let placaMaisForte = listaPlacasRequisitos.reduce( (anterior, atual) => {
        return anterior.gflops < atual.gflops ? atual : anterior;
    })

    let placasAtendemCriterioAno = cache.listaPlacasBD.filter(placa => placa.data_lancamento >= (anoAtual - 6))

    placasAtendemCriterioAno = placasAtendemCriterioAno.sort((anterior, atual) => {
        if (anterior.gflops > atual.gflops ) return 1;
        if (anterior.gflops < atual.gflops ) return -1;
        return 0;
    })
    return placasAtendemCriterioAno.find((placa) => placa.gflops >= placaMaisForte.gflops )
}

function converteRequisitosEmArrayNomesPlacas (requisitos){
    if(!(Array.isArray(requisitos) && requisitos.length > 0)){
        return [];
    }
    let listaNomesPlacas = [];
    requisitos.forEach((requisito) => {
        if (requisito.Gpu != null && requisito.Gpu != undefined && requisito.Gpu != '' ){
            let nomesPlacas = requisito.Gpu.split(regexSplit)
            nomesPlacas.forEach(nome => listaNomesPlacas.push(nome))
        }
    })
    return listaNomesPlacas;
}

async function recomendaPlacaVideoComBaseRequisitos(listaRequisitos){
    let listaPlacasTipoBD = [];
    
    let nomesPlacas =  converteRequisitosEmArrayNomesPlacas(listaRequisitos);
    if(nomesPlacas.length === 0){
        throw 'Nenhum requisito GPU encontrado'
    }
    for(let nomePlaca of nomesPlacas){
        let retornoPesquisa = await pesquisaUmaPlacaNaListaBD(nomePlaca);
        if(!(retornoPesquisa === null)){
            listaPlacasTipoBD.push(retornoPesquisa);
        }
    }
    if(!(listaPlacasTipoBD.length)){
        throw 'Nenhuma placa encontrada no BD';
    }
    return retornaMelhorPlacaComCriterioLancamento(listaPlacasTipoBD);
}

export default {
    recomendaPlacaVideoComBaseRequisitos
}
