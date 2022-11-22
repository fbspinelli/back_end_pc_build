import modelPlacaVideo from '../models/PlacaDeVideo.js'
//controller deve conter logicas referente as entradas de dados

async function calculaPlacaDeVideo (req, res){

    let jsonRetorno = {};
    let requisitos = req.body.requisitos;
    let listaPlacasBD = [];
    //if(requisitos.length() > 5){ERRO!!};
    let nomesPlacas =  modelPlacaVideo.converteRequisitosEmArrayComNomesPlacas(requisitos);
    for(let nomePlaca of nomesPlacas){
        listaPlacasBD.push(await modelPlacaVideo.pesquisaUmaPlacaNaListaBD(nomePlaca));
    }

    
    jsonRetorno = modelPlacaVideo.retornaMelhorPlacaComCriterioLancamento(listaPlacasBD)
    return res.status(200).json(jsonRetorno);


}


export default {calculaPlacaDeVideo}

