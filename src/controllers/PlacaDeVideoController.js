import modelPlacaVideo from '../models/PlacaDeVideo.js'
//controller deve conter logicas referente as entradas de dados
//VALIDE TOKEN
async function calculaPlacaDeVideo (req, res){
    //#swagger.security = [{"jwt": []}]
    let jsonRetorno;
    try {
        jsonRetorno = await modelPlacaVideo.recomendaPlacaVideoComBaseRequisitos(req.body.requisitos);
    } catch (error) {
        return res.status(500).json({erro:error});
    }
    return res.status(200).json(jsonRetorno);
}

export default {calculaPlacaDeVideo}

