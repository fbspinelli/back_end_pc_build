const espacos = / /g;
const regexRam = /\d+MB|\d+GB/g ;
const conjuntoNaoNumerico = /[^0-9]/g;



function encontraMaiorMemoriaDosRequisitos (listaRequisitos){
    let listaDeRam = listaRequisitos.map(requisito => {
        return requisito.Ram = requisito.Ram.replace(espacos,'').toUpperCase();
    });
    let listaValoresMemoria = [];
    listaDeRam.forEach(fraseRequisitoRam => {
        let arrayResults = fraseRequisitoRam.match(regexRam);
        arrayResults.forEach(e => listaValoresMemoria.push(e));
    });
    let listaMemoriasGB = listaValoresMemoria.filter(m => m.includes('GB'));
    if(listaMemoriasGB.length){
        listaMemoriasGB = listaMemoriasGB.map(m => m.replace(conjuntoNaoNumerico,''))
        return listaMemoriasGB.reduce((a,b) => Math.max(a,b)) + 'GB DDR4';
    }
    else{
        let listaMemoriasMB = listaValoresMemoria.filter(m => m.includes('MB'));
        if(listaMemoriasMB.length){
            return '8GB DDR4';
        }
        else{
            return -1;
        }
    }
}

export default {
    encontraMaiorMemoriaDosRequisitos
}
