

function favoritaPc (req, res){
  return res.status(500).json({mensagem:"Rota em desenvolvimento"})
}

export default {favoritaPc}



const jsonExemplo = {
    "usuario":{
        "nome" : "Gabriel silva",
        "senha" : "123456",
        "email" : "fecodemais@gmail.com"
    },
    "pecas": [
      {
        "title": "Radeon RX 6500 XT"
      },
      {
        "title": "8GB DDR4"
      },
      {
        "title": "240GB"
      }
    ],
    "tipo": "Recomendada",
    "jogos": [{jogo1:''},{jogo2:''},{jogo3:''}]
}