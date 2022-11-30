import modelUsuario from '../models/Usuario.js'
import axios from 'axios'
import urls from '../config/Urls.js';

async function favoritaPc (req, res){
  try {
    let usuario_id;
    if(req.body?.usuario?.email === undefined) throw 'E-mail usuario não informado';
    let usuario = await modelUsuario.buscaUsuarioPorEmail(req.body.usuario.email);
    if(usuario === undefined){
      throw 'Usuário não encontrado'
    }
    else{
      usuario_id = usuario.id
    }
    let pecas = JSON.stringify(req.body?.pecas);
    let tipo = req.body?.tipo;
    let jogos = JSON.stringify(req.body?.jogos);
    let jsonAxios = {
      usuario_id,
      pecas : `${pecas}`,
      jogos : `${jogos}`,
      tipo
    }
    console.log(jsonAxios);
    await axios.post(
      urls.postFavorito,
      jsonAxios
    )


  } catch (error) {
    return res.status(500).json({"erro":error})
    
  }
  return res.status(201).json({mensagem:"Configuração salva"});
}

export default {favoritaPc}
