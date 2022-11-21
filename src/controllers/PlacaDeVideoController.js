import modelPlacaVideo from '../models/PlacaDeVideo.js'
//controller deve conter logicas referente as entradas de dados

function calculaPlacaDeVideo (req, res){

    let jsonRetorno = {};
    let requisitos = req.body.requisitos;
    let nomesPlacas =  modelPlacaVideo.converteRequisitosEmArrayComNomesPlacas(requisitos);
    //if(requisitos.length() > 5){};



    return res.status(200).json(jsonRetorno);
}


export default {calculaPlacaDeVideo}

