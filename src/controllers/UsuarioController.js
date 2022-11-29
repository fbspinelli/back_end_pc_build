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
    try {
        let usuario = await usuarioModel.usuarioPossuiPermissao(email, senha)
        if(usuario){
            const token = jwt.sign({id:usuario.id}, process.env.SECRET, {expiresIn: '60m'});//em segundos
            delete usuario.senha
            delete usuario.links
            res.status(200).json({autenticado:true,token:token,usuario});
        }
        else{
            res.status(401).json({erro:'E-mail ou senha incorreto'});
        }
    } catch (error) {
        res.status(401).json({erro:error});
    }
}




export default {cadastrarUsuario, autenticaUsuario};