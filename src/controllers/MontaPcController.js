import modelPlacaVideo from '../models/PlacaDeVideo.js'
import modelRam from '../models/MemoriaRam.js'
import modelArmazenamento from '../models/Armazenamento.js'
import modelApiGoogle from '../models/ApiGoogle.js'

async function montaPC(req, res){
    try{
        let gpu = await modelPlacaVideo.recomendaPlacaVideoComBaseRequisitos(req.body.requisitos);
        gpu = await modelApiGoogle.retornaUmProdutoDaApiShopping(gpu.gpu);
    
        let ram = modelRam.encontraMaiorMemoriaDosRequisitos(req.body.requisitos);
        ram = await modelApiGoogle.retornaUmProdutoDaApiShopping('Memoria ram ' + ram);
    
        let armazenamento = modelArmazenamento.somaArmazenamentoRequisitos(req.body.requisitos);
        armazenamento = await modelApiGoogle.retornaUmProdutoDaApiShopping('SSD '+ armazenamento);
    
        let cpu = {
            "title": "Processador AMD Ryzen 5 5600G, 3.9GHz (4.4GHz Max Turbo), Cache 19MB, 6 Núcleos, 12 Threads, Vídeo Integrado, AM4 - 100-100000252BOX",
            "link": "https://www.google.com/aclk?sa=l&ai=DChcSEwiF0LX_0O_5AhXlkGgJHXV3D18YABADGgJ3Zg&sig=AOD64_1uNXaKPsDPJ182qBnsD6Wpf6D02w&ctype=5&q=&ved=0ahUKEwjEx7D_0O_5AhVSVfEDHYR_AOYQww8I9Ag&adurl=",
            "is_carousel": true,
            "carousel_position": "top",
            "price": 1289.99,
            "price_raw": "R$ 1.289,99",
            "price_parsed": {
                "symbol": "R$",
                "value": 1289.99,
                "currency": "BRL",
                "raw": "R$1.289,99"
            },
            "merchant": "KaBuM!",
            "merchant_id": "8231017",
            "offer_id": "181088",
            "has_compare_prices": false,
            "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSGSNeB-sN3Pz9TLYWJWgLEyCPTyagyNhHeUjd6xE-qZvR0QjCBEewgrraZY9-xuP_6MmcBEaF3qFI4hngq25aQsaTntY2SQnehNMTRkFWpTdkd8YZbpOPvnw&usqp=CAE",
            "position": 2,
            "has_product_page": false
        }
        let jsonRetorno = {cpu,gpu,ram,armazenamento};
        return res.status(200).json(jsonRetorno)
    }
    catch(e){
        return res.status(500).json({erro:"Erro ao montar o pc"});
    }
    
    
    
}

export default {montaPC};