const espacos = / /g;
const regexRom = /\d+MB|\d+GB|\d+TB/g ;
const conjuntoNaoNumerico = /[^0-9]/g;
const ssdsGB = [240, 480, 960, 2000];


function somaArmazenamentoRequisitos (listaRequisitos){
    if((!Array.isArray(listaRequisitos)) || listaRequisitos.length == 0){
        throw 'Nenhum requisito informado'
    }
    let listaDeRoms = listaRequisitos.map(requisito => {
        if (requisito.Armazenamento != null && requisito.Armazenamento != undefined){
            return requisito.Armazenamento.replace(espacos,'').toUpperCase();
        }
        else return '';
    });
    let listaValoresRom = [];
    listaDeRoms.forEach(fraseRequisitoRom => {
        let arrayResultsMatchs = fraseRequisitoRom.match(regexRom);
        if(arrayResultsMatchs != null && arrayResultsMatchs.length > 0){
            arrayResultsMatchs.forEach(e =>  listaValoresRom.push(e))
        }
    });
    if(listaValoresRom.length === 0){
        throw 'Nenhum valor de armazenamento encontrado'
    }
    listaValoresRom = listaValoresRom.map(rom => {
        if(rom.includes('MB')){
            rom.replace(conjuntoNaoNumerico,'');
            rom = rom * 0.001; //conversao de MB para GB
            return rom;
        }
        if(rom.includes('TB')){
            rom.replace(conjuntoNaoNumerico,'');
            rom = rom * 1000; //conversao de TB para GB
            return rom;
        }
        return parseInt(rom.replace(conjuntoNaoNumerico,''));
    })
    listaValoresRom.push(64); // adiciona 64GB para o SO
    let totalGBs = listaValoresRom.reduce((acumulador, atual) => acumulador + atual);
    return (ssdsGB.find(ssd => ssd >= totalGBs)) + 'GB';
}

export default {
    somaArmazenamentoRequisitos
}