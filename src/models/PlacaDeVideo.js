import urls from '../config/dbUrls.js'
import axios from 'axios';
import helperString from '../helper/helperString.js'
const parenteses = new RegExp('([()])', 'ig');
const espacosEparenteses = new RegExp('([()])|\s', 'ig');

let listaPlacasBD;

async function obterListaPlacasBD(){
    await axios.get(urls.getAllPlacasDeVideo).then((retorno) => {
        listaPlacasBD = retorno.data.items.map(placa => {
            placa.gpu = placa.gpu.replace(parenteses,'');
            return placa;
        })
    })
}

async function pesquisaUmaPlacaNaListaBD(stringPlacaRequisito){
    if(listaPlacasBD === undefined){
        await obterListaPlacasBD();
    }
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

pesquisaUmaPlacaNaListaBD('NVIDIA GeForce GTX 1060 or AMD Radeon RX 580 - DirectX 12.0').then((retorno) => console.log(retorno));


export default {pesquisaUmaPlacaNaListaBD}
