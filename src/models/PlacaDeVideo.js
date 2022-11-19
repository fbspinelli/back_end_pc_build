import urls from '../config/dbUrls.js'
import axios from 'axios';
const regex = new RegExp('([()])', 'ig');

axios.get(urls.getAllPlacasDeVideo).then((retorno) => {
    const nomesDePlacas = retorno.data.items.map(placa => placa.gpu);
    let requisito = 'GTX Titan'.replace(regex,'');
    let resultado = pesquisaUmaPlacaNaLista(requisito,nomesDePlacas);
    console.log(resultado);
})
 
function calculaQuantidadePalavrasEmComum(frase1, frase2){
    let palavrasFrase1 = frase1.toUpperCase().split(' ');
    let palavrasFrase2 = frase2.toUpperCase().split(' ');
    let quantidadePalavrasEmComum = 0;

    palavrasFrase1.forEach((palavraFraseBase) => {
        palavrasFrase2.forEach((palavraFraseAlvo) => {
            if (palavraFraseBase === palavraFraseAlvo){
                quantidadePalavrasEmComum ++;
            }
        })
    })
    return quantidadePalavrasEmComum;
}

function calculaQuantidadeDePalavrasSemCorrespondencia(frase1, frase2){
    let palavrasFrase1 = frase1.toUpperCase().split(' ');
    let palavrasFrase2 = frase2.toUpperCase().split(' ');
    let quantidadePalavrasErradas = 0;

    palavrasFrase1.forEach((palavraFrase1) => {
        palavrasFrase2.forEach((palavraFrase2) => {
            if(palavraFrase1 !== palavraFrase2){
                quantidadePalavrasErradas++;
            }
        })
    })
    return quantidadePalavrasErradas;
}

function pesquisaUmaPlacaNaLista(stringPlacaAlvo, listaPlacas){
    let melhorCorrespondencia = 0;
    let melhoresCorrespondencias = [];
    
    
    listaPlacas.forEach((nomePlacaDaLista, index) => {
        let palavrasEmComum = calculaQuantidadePalavrasEmComum(nomePlacaDaLista,stringPlacaAlvo);
        if(palavrasEmComum > 0 && palavrasEmComum >= melhorCorrespondencia){
            melhoresCorrespondencias.push({
                nomePlacaDaLista,
                palavrasEmComum
            });
            melhorCorrespondencia = palavrasEmComum;
        }
    })
    
    melhoresCorrespondencias = melhoresCorrespondencias.filter((jsonPlacaVideo) => jsonPlacaVideo.palavrasEmComum === melhorCorrespondencia)

    //eliminar o que tem mais palavras erradas
    let indexMelhor = 0;
    let menorQuantErros = calculaQuantidadeDePalavrasSemCorrespondencia(melhoresCorrespondencias[0].nomePlacaDaLista,stringPlacaAlvo)
    melhoresCorrespondencias.forEach((frase1, index) => {
        let palavrasErradas = calculaQuantidadeDePalavrasSemCorrespondencia(frase1.nomePlacaDaLista,stringPlacaAlvo);
        if (palavrasErradas < menorQuantErros){
            menorQuantErros = palavrasErradas;
            indexMelhor = index;
        }
    })
    return melhoresCorrespondencias[indexMelhor];
}

export default {calculaQuantidadePalavrasEmComum, pesquisaUmaPlacaNaLista}
