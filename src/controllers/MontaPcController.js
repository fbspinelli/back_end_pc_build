import modelPlacaVideo from '../models/PlacaDeVideo.js'
import modelRam from '../models/MemoriaRam.js'
import modelArmazenamento from '../models/Armazenamento.js'
import modelApiGoogle from '../models/ApiGoogle.js'

async function montaPC(req, res){
    let placa = await modelPlacaVideo.recomendaPlacaVideoComBaseRequisitos(req.body.requisitos);
    placa = await modelApiGoogle.retornaUmProdutoDaApiShopping(placa.gpu);

    let ram = modelRam.encontraMaiorMemoriaDosRequisitos(req.body.requisitos);
    ram = await modelApiGoogle.retornaUmProdutoDaApiShopping('Memoria ram ' + ram);

    let armazenamento = modelArmazenamento.somaArmazenamentoRequisitos(req.body.requisitos);
    armazenamento = await modelApiGoogle.retornaUmProdutoDaApiShopping('SSD '+ armazenamento);

    //recomenda processador fixo

}

export default {montaPC};