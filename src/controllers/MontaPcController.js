import modelPlacaVideo from '../models/PlacaDeVideo.js'
import modelRam from '../models/MemoriaRam.js'
import modelArmazenamento from '../models/Armazenamento.js'
import modelApiGoogle from '../models/ApiGoogle.js'

async function montaPC(req, res){
    //#swagger.security = [{"jwt": []}]
    /*
        [{
            "Armazenamento": " 100 GB available space",
            "Cpu": " Intel Core i5-2500K@3.3GHz or AMD FX 6300@3.5GHz",
            "Gpu": " Nvidia GeForce GTX 780 (3 GB) or AMD Radeon R9 290 (4GB)",
            "Ram": " 8 GB RAM"
        }]
    */
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