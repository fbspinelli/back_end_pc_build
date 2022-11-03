const axios = require ("axios")
const SteamAPI = require("steamapi");
const steam = new SteamAPI("steam token");

const urlGetListaDeIdsJogos = "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=1640848EDE04C9DDF3967D8655B2C265&format=json"
const urlGetDetalhesJogo = "https://store.steampowered.com/api/appdetails?appids="
const urlPostBd = "https://g4673849dbf8477-qwkkduaklu8amhgz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/tb_jogo/"

const funcao = async() =>{
    let contador = 0
    let listaIdsENomesJogos = undefined;
    try{
        listaIdsENomesJogos = await axios.get(urlGetListaDeIdsJogos)
    }catch(e){
        console.log("Falhei na requisição lista". e)
    }

    for(idJogo of listaIdsENomesJogos.data.applist.apps){
        if(contador <= 199){
            console.log("vou chamar os detalhes do jogo, contador: " + contador)
            let jogo = undefined
            try{
                jogo = await axios.get(urlGetDetalhesJogo + idJogo?.appid) 
            }catch(e){
                console.log("Falhei na requisição jogo". e)
            }
            
            if(jogo.data?.type === "game"){
                console.log("achei um do tipo game")
                let jogoDTO = {
                    id_jogo_steam: jogo?.steam_appid,
                    nome: jogo?.name,
                    imagem: jogo?.header_image,
                    requisitosMinimos: jogo?.pc_requirements?.minimum,
                    requisitosRecomendados: jogo?.pc_requirements?.recommended,
                    preco: jogo?.price_overview?.final_formatted
                }
                console.log(jogoDTO.nome)
                try{
                    await axios.post(urlPostBd, jogoDTO)
                }
                catch(e){
                    console.log("Falhei no post BD", e)
                }
                
            }  
            contador ++
        }
        else{
            const dataAtualMaisSeisMin = new Date().getTime() + 360000
            while(new Date().getTime() <= dataAtualMaisSeisMin);
            contador = 0
        }                      
    }
}
funcao()