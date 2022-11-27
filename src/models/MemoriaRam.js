const espacos = / /g;
const regexRam = /\d+MB|\d+GB/g ;
const conjuntoNaoNumerico = /[^0-9]/g;



function encontraMaiorMemoriaDosRequisitos (listaRequisitos){
    if((!Array.isArray(listaRequisitos)) || listaRequisitos.length === 0){
        throw 'Nenhum requisito informado'
    }
    let listaDeRam = listaRequisitos.map(requisito => {
        if (requisito.Ram != null && requisito.Ram != undefined && requisito.Ram != '' ){
            return requisito.Ram = requisito.Ram.replace(espacos,'').toUpperCase();
        }
        else return '';
    });
    let listaValoresMemoria = [];
    if(listaDeRam.length){
        listaDeRam.forEach(fraseRequisitoRam => {
        let arrayResults = fraseRequisitoRam.match(regexRam);
        if((arrayResults != null) && (arrayResults.length > 0)){
            arrayResults.forEach(e => listaValoresMemoria.push(e));
        }
        });
    }
    if(listaValoresMemoria.length === 0){
        throw 'Nenhum valor de memoria RAM encontrado';
    }
    let listaMemoriasGB = listaValoresMemoria.filter(m => m.includes('GB'));
    let memoriaRecomendada;
    if(listaMemoriasGB.length){
        listaMemoriasGB = listaMemoriasGB.map(m => m.replace(conjuntoNaoNumerico,''))
        memoriaRecomendada = listaMemoriasGB.reduce((a,b) => Math.max(a,b));
    }
    else{
        let listaMemoriasMB = listaValoresMemoria.filter(m => m.includes('MB'));
        if(listaMemoriasMB.length){
            return '8GB DDR4';
        }
    }
    return (memoriaRecomendada >= 8 ? memoriaRecomendada + 'GB DDR4' : '8GB DDR4');
}

export default {
    encontraMaiorMemoriaDosRequisitos
}
