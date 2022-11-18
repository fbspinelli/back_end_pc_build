import urls from '../config/dbUrls.js'
import axios from 'axios';
const regex = new RegExp('([()])', 'ig');

axios.get(urls.getAllPlacasDeVideo).then((retorno) => {
    const nomesDePlacas = retorno.data.items; //.map(placa => placa.gpu);
    let requisito = 'Radeon RX 580 series 8GB'.replace(regex,'');
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

function pesquisaUmaPlacaNaLista(stringPlacaAlvo, listaPlacas){
    let melhorCorrespondencia = calculaQuantidadePalavrasEmComum(stringPlacaAlvo, listaPlacas[0]);
    let indexMelhorCorrespondencia;
    
    listaPlacas.forEach((nomePlacaDaLista, index) => {
        let palavrasEmComum = calculaQuantidadePalavrasEmComum(nomePlacaDaLista,stringPlacaAlvo);
        if(palavrasEmComum > melhorCorrespondencia){
            indexMelhorCorrespondencia = index;
            melhorCorrespondencia = palavrasEmComum;
        }
    })
    return listaPlacas[indexMelhorCorrespondencia];
}

export default {calculaQuantidadePalavrasEmComum, pesquisaUmaPlacaNaLista}
