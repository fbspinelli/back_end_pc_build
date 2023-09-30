import modelPlacaVideo from '../models/PlacaDeVideo.js'
import modelRam from '../models/MemoriaRam.js'
import modelArmazenamento from '../models/Armazenamento.js'
import modelApiGoogle from '../models/ApiGoogle.js'

async function montaPC(req, res){
    /*
    #swagger.description = 'Endpoint para calcular a peças necessárias com base em varios requisitos'
    #swagger.parameters['requisitos'] = {
      in: 'body',
      required: true,
      schema: {"requisitos" : 
        [{
            "Armazenamento": " 100 GB available space",
            "Cpu": " Intel Core i5-2500K@3.3GHz or AMD FX 6300@3.5GHz",
            "Gpu": " Nvidia GeForce GTX 780 (3 GB) or AMD Radeon R9 290 (4GB)",
            "Ram": " 8 GB RAM"
        }]
      }
    }
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
        /*#swagger.responses[200] = {
            description: 'Calculado com sucesso.',
            schema: {
                "placa": {
                    "title": "GeForce GTX 1660"
                },
                "ram": {
                    "title": "8GB DDR4"
                },
                "rom": {
                    "title": "240GB"
                }
            }
        }*/

    }
    catch(e){
        return res.status(500).json({erro:e});
        /*#swagger.responses[500] = {
            description: 'Erro ao calcular.',
            schema: {
                "erro": "Menssagem."
            }
        }*/
    }
    
    
    
}

export default {montaPC};