const espacos = / /g;
const regexRom = /\d+MB|\d+GB|\d+TB/g ;
const conjuntoNaoNumerico = /[^0-9]/g;
const ssdsGB = [240, 480, 960, 2000];


function somaArmazenamentoRequisitos (listaRequisitos){
    let listaDeRoms = listaRequisitos.map(requisito => {
        return requisito.Armazenamento = requisito.Armazenamento?.replace(espacos,'')?.toUpperCase();
    });
    let listaValoresRom = [];
    listaDeRoms.forEach(fraseRequisitoRom => {
        let arrayResultsMatchs = fraseRequisitoRom.match(regexRom);
        if(!(arrayResultsMatchs === null)){
            arrayResultsMatchs.forEach(e =>  listaValoresRom.push(e))
        }
    });
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