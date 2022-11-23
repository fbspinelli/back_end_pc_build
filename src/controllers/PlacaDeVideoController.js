import modelPlacaVideo from '../models/PlacaDeVideo.js'
//controller deve conter logicas referente as entradas de dados
//VALIDE TOKEN
async function calculaPlacaDeVideo (req, res){
    let jsonRetorno
    try {
        jsonRetorno = await modelPlacaVideo.recomendaPlacaVideoComBaseRequisitos(req.body.requisitos);
    } catch (error) {
        return res.status(500).json({erro:'Erro ao calcular placa'});
    }
    return res.status(200).json(jsonRetorno);
}

export default {calculaPlacaDeVideo}

