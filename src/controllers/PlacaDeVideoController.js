import modelPlacaVideo from '../models/PlacaDeVideo.js'
//controller deve conter logicas referente as entradas de dados
//VALIDE TOKEN
async function calculaPlacaDeVideo (req, res){

    let listaPlacasBD = [];
    //if(requisitos.length() > 5){ERRO!!}; TRATAR COM TRY CATCH
    let nomesPlacas =  modelPlacaVideo.converteRequisitosEmArrayComNomesPlacas(req.body.requisitos);
    for(let nomePlaca of nomesPlacas){
        listaPlacasBD.push(await modelPlacaVideo.pesquisaUmaPlacaNaListaBD(nomePlaca));
    }
    let jsonRetorno = modelPlacaVideo.retornaMelhorPlacaComCriterioLancamento(listaPlacasBD)
    return res.status(200).json(jsonRetorno);
}

export default {calculaPlacaDeVideo}

