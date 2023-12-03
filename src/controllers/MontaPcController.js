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
            "Armazenamento": " 100 GB available",
            "Cpu": " Intel Core i5-2500K@3.3GHz or AMD FX 6300@3.5GHz",
            "Gpu": " Nvidia GeForce GTX 780 (3 GB) or AMD Radeon R9 290 (4GB)",
            "Ram": " 8 GB RAM"
        }]
      }
    }
    */
    let gpu, ram, armazenamento;
    let erros = []

    try {
        gpu = await modelPlacaVideo.recomendaPlacaVideoComBaseRequisitos(req.body.requisitos);
    } catch (erro) {
        gpu = null;
        erros.push(erro)
    }
    try {
        ram = modelRam.encontraMaiorMemoriaDosRequisitos(req.body.requisitos);
    } catch (erro) {
        ram = null;
        erros.push(erro)
    }
    try {
        armazenamento = modelArmazenamento.somaArmazenamentoRequisitos(req.body.requisitos);
    } catch (erro) {
        armazenamento = null;
        erros.push(erro)
    }

    let jsonRetorno = {
        placa: gpu,
        ram: ram,
        rom: armazenamento,
        erros: erros
    };
    return res.status(200).json(jsonRetorno)
    /*#swagger.responses[200] = {
        description: 'Calculado com sucesso.',
        schema: {
            "placa": "GeForce GTX 1660",
            "ram": "8GB DDR4",
            "rom": "240GB",
            "erros": []
        }
    }*/
}

export default {montaPC};