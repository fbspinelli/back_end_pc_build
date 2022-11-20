import modelPlacaVideo from '../models/PlacaDeVideo.js'
//controller deve conter logicas referente as entradas de dados

function calculaPlacaDeVideo (req, res){

    let jsonRetorno
    jsonRetorno = modelPlacaVideo.pesquisaUmaPlacaNaListaBD(req.body.requisitos[0].Gpu);

    //tratar or no requisito GPU


    res.status(200).json(jsonRetorno);
}


export default calculaPlacaDeVideo

