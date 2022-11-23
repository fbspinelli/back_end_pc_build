const parenteses = new RegExp('([()])', 'ig');
const espacos = new RegExp('\s', 'ig');
const regexRam = new RegExp('\d+MB|\d+GB', 'ig');



function extraiRamRequisito (listaRequisitos){
    let listaDeRam = listaRequisitos.map(requisito => {
        return requisito.Ram = requisito.Ram.replace(espacos,'').toUpperCase();
    });
    
}