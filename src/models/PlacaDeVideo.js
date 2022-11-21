import urls from '../config/dbUrls.js'
import axios from 'axios';
import helperString from '../helper/helperString.js'
const parenteses = new RegExp('([()])', 'ig');
const espacosEparenteses = new RegExp('([()])|\s', 'ig');

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
    //talvez mudar para sort e retornar sem o if da linha 46
    melhoresResultados = melhoresResultados.reduce((anterior, atual) => {
        if(anterior.resultadoAnalise.quantidadePalavrasErradas < atual.resultadoAnalise.quantidadePalavrasErradas){
            return anterior;
        }
        else{
            return atual;
        }
    })
    return (Array.isArray(melhoresResultados) ? melhoresResultados[0].placa : melhoresResultados.placa);


}

function calculaMelhorPlacaComCriterioLancamento (listaPlacasRequisitos){
    const date = new Date();
    const anoAtual = date.getFullYear();
    
    let placasAtendemCriterioAno = listaPlacasBD.filter(placa =>  {
        placa.data_lancamento >= (anoAtual - 4)
    })
    placaMaisForte = listaPlacasRequisitos.reduce( (anterior, atual) => {
        anterior.gflops < atual.gflops ? atual : anterior;
    })
    placasAtendemCriterioAno = placasAtendemCriterioAno.sort((anterior, atual) => {
        if (anterior.gflops > atual.gflops ) return 1;
        if (anterior.gflops < atual.gflops ) return -1;
        return 0;
    })
    let indexResultadoPlaca
    placasAtendemCriterioAno.forEach((placa, index) => {
        if(placa.gflops >= placaMaisForte.gflops) indexResultadoPlaca = index;
    })
    return placasAtendemCriterioAno[indexResultadoPlaca];
    
}

pesquisaUmaPlacaNaListaBD('3060tI').then((retorno) => console.log(retorno));


export default {pesquisaUmaPlacaNaListaBD}
