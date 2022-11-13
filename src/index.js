const urls = require('../urls/urls')
const axios = require ("axios");
const express = require ("express")
const { parse } = require("himalaya");
const regex = /[^0-9a-zA-Z() " : , { } @ . / -]/gi
const extraiRequisitos = (requisito)=>{
    const reqHtml = requisito
    const reqJson = parse(reqHtml)
    let dadosReq, cpu, ram, armazenamento, gpu
  
    // for (let i = 0; i < 10; i++) {
    //   console.log('teste');
    //   if (reqJson?.[i]?.children && reqJson?.[i]?.children?.[i+2]) {
    //     console.log('teste')
    //     dadosReq = reqJson?.[i]?.children
    //   }
    // }
  
    if (reqJson?.[0]?.children && reqJson?.[0]?.children?.[1]) {
      dadosReq = reqJson?.[0]?.children 
    }
    else if (reqJson?.[1]?.children && reqJson[1].children?.[1]) {
      dadosReq = reqJson?.[1]?.children
    }
    else if (reqJson?.[2]?.children && reqJson[2].children?.[1]) {
      // console.log(reqJson[2].children?.[1]);
      dadosReq = reqJson?.[2]?.children
    }
    else if (reqJson?.[3]?.children && reqJson[3].children?.[1]) {
      dadosReq = reqJson?.[3]?.children
    }
    else {
      dadosReq = reqJson?.[2]?.children
    }
    
    for (const obj of dadosReq) {
      let categoria
      let peca
      if(obj?.children?.[0]?.children?.[0]){
        categoria = obj.children[0].children[0].content
      }
      else if(obj?.children?.[0]){
        categoria = obj.children[0].content
      }
      else{
        categoria = ''
      }
      if (obj?.children?.[1]?.content) {
        peca = obj?.children[1]?.content
        switch (categoria) {
          case 'Processor:' || 'Processador':
            cpu = peca.replace(regex, '');
            break;
          case 'Memory:' || 'Memória':
            ram = peca.replace(regex, '');
            break;
          case 'Graphics:' || 'Placa de vídeo:'||  'Video Card:':
            gpu = peca.replace(regex, '');
            break;
          case 'Storage:' || 'Armazenamento' || 'Hard Disk Space':
            armazenamento = peca.replace(regex, '');
            break;
        }
      }
    }
    // console.log(resultado);
    const requisitos = `{"Armazenamento": "${armazenamento}","Cpu": "${cpu}","Gpu": "${gpu}","Ram": "${ram}"}`
    // console.log(requisitos)
    return requisitos;
  
}

const app = express();
app.listen(80)

app.get("/teste", (req, res) => {
    res.send("Oi sou seu servidor :)")
})

// const funcao = async() =>{
//     let contador = 0
//     let listaIdsENomesJogos;
//     try{
//         listaIdsENomesJogos = await axios.get(urls.GetListaDeIdsJogos)
//     }catch(e){
//         console.log("Falhei na requisição lista". e)
//     }

//     for(const item of listaIdsENomesJogos.data.applist.apps){
//         if(contador <= 190){
//             console.log("vou chamar os detalhes do jogo, contador: " + contador)
//             const idJogo = item.appid
//             const objetoJogo = await axios.get(urls.GetDetalhesJogo + idJogo) 
//             const detalheJogo = objetoJogo?.data[idJogo]?.data
//             if (objetoJogo?.data?.[idJogo]?.success === true){

                
//                 if(detalheJogo?.type === "game"){
//                     console.log("Nome:", detalheJogo?.name);
//                     console.log("achei um jogo");
//                     let jogo = {
//                         id_jogo_steam: detalheJogo?.steam_appid,
//                         nome: detalheJogo?.name.replace(regex, ''),
//                         imagem: detalheJogo?.header_image,
//                         preco: detalheJogo?.price_overview?.final_formatted,
//                     }

//                     if (detalheJogo?.pc_requirements?.minimum) {
//                         jogo.requisitosminimos = `${extraiRequisitos(detalheJogo?.pc_requirements?.minimum)}`
//                     }
        
//                     if (detalheJogo?.pc_requirements?.recommended) {
//                         jogo.requisitosrecomendados = `${extraiRequisitos(detalheJogo?.pc_requirements?.recommended)}`
//                     }

//                     console.log(jogo.nome)

//                     try{
//                         await axios.post(urlPostBd, jogo)
//                         console.log("Inseriu")
//                     }
//                     catch(e){
//                         console.log("Falhei no post BD", e)
//                     }
                    
//                 }  
//             }
//             contador ++
//         }
//         else{
//             const dataAtualMaisSeisMin = new Date().getTime() + 360000
//             while(new Date().getTime() <= dataAtualMaisSeisMin);
//             contador = 0
//         }                      
//     }
// }
// funcao()
//{"applist":{"apps":[
//id procurado 2124910

const descobre = async() => {
  const resposta = await axios.get(urls.GetListaDeIdsJogos)
  const pos = resposta.data.applist.apps.map(o => {o.appid; console.log(o.appid)}).indexOf(2126830);
  console.log(pos)
}

descobre();


