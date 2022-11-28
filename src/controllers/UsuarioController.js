import usuarioModel from '../models/Usuario.js'

async function cadastrarUsuario (req , res){
    const {nome, email, senha} = req.body.usuario;
    let usuarioBD;
    try {
        usuarioBD = await usuarioModel.cadastrarUsuario(nome, email, senha);
    } catch (e) {
        res.status(500).json({erro:e})
    }
    return res.status(201).json(usuarioBD)
}

export default {cadastrarUsuario};