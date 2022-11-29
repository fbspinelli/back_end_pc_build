import usuarioModel from '../models/Usuario.js'
import jwt from 'jsonwebtoken'


async function cadastrarUsuario (req , res){
    let usuarioBD;
    try {
        const {nome, email, senha} = req.body.usuario;
        usuarioBD = await usuarioModel.cadastrarUsuario(nome, email, senha);
    } catch (e) {
        res.status(500).json({erro:e})
    }
    return res.status(201).json(usuarioBD)
}

async function autenticaUsuario (req, res){
    const {email, senha} = req.body.usuario;
    let usuario = await usuarioModel.buscaUsuarioPorEmail(email);
    try {
        if(usuarioModel.usuarioPossuiPermissao(email, senha)){
            const token = jwt.sign({id:usuario.id}, 'TccBuild2022', {expiresIn: 300});//em segundos
            res.status(200).json({autenticado:true,token:token});
        }
    } catch (error) {
        res.status(401).json({erro:error});
    }
}

function verificaJWT(req, res){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}


export default {cadastrarUsuario, autenticaUsuario};