import modelPlacaVideo from '../models/PlacaDeVideo.js'
import modelRam from '../models/MemoriaRam.js'
import modelArmazenamento from '../models/Armazenamento.js'
import modelApiGoogle from '../models/ApiGoogle.js'

async function montaPC(req, res){
    try{
        let gpu = await modelPlacaVideo.recomendaPlacaVideoComBaseRequisitos(req.body.requisitos);
        //gpu = await modelApiGoogle.retornaUmProdutoDaApiShopping(gpu.gpu);
    
        let ram = modelRam.encontraMaiorMemoriaDosRequisitos(req.body.requisitos);
        //ram = await modelApiGoogle.retornaUmProdutoDaApiShopping('Memoria ram ' + ram);
    
        let armazenamento = modelArmazenamento.somaArmazenamentoRequisitos(req.body.requisitos);
        //armazenamento = await modelApiGoogle.retornaUmProdutoDaApiShopping('SSD '+ armazenamento);
    
        let jsonRetorno = {
            placa: {title:gpu.gpu},
            ram: {title:ram},
            rom: {title:armazenamento}
        };
        return res.status(200).json(jsonRetorno)
    }
    catch(e){
        return res.status(500).json({erro:e});
    }
    
    
    
}

export default {montaPC};