import usuarioModel from '../models/Usuario.js'
import jwt from 'jsonwebtoken'


async function cadastrarUsuario (req , res){
    /*
    #swagger.description = 'Endpoint para cadastrar usuário'
    #swagger.parameters['usuario'] = {
      in: 'body',
      required: true,
      schema: {
        usuario: {
            "nome" : "string"  ,
            "email" : "string" ,
            "senha" : "senha descriptografada"
        }
      }
    }
    */
    let usuarioBD;
    try {
        const {nome, email, senha} = req.body.usuario;
        usuarioBD = await usuarioModel.cadastrarUsuario(nome, email, senha);
    } catch (e) {
        /*#swagger.responses[500] = {
            description: 'Erro interno',
            schema: {"erro": "Descrição erro"}
        }*/
        res.status(500).json({erro:e})
    }
    /* 
    #swagger.responses[201] = {
        description: 'Usuário cadastrado com sucesso.',
        schema: {
            "id": 0,
            "nome": "string",
            "email": "string"
        }
    }*/
    return res.status(201).json(usuarioBD)
}

async function autenticaUsuario (req, res){
    /*#swagger.description = 'Endpoint obter token com duração de 60 minutos'
    #swagger.parameters['usuario'] = {
      in: 'body',
      required: true,
      schema: {
        usuario: {
          email: 'exemplo@email.com',
          senha: 'Senha'
        }
      }
    }
  */
    const {email, senha} = req.body.usuario;
    try {
        let usuario = await usuarioModel.usuarioPossuiPermissao(email, senha)
        if(usuario){
            const token = jwt.sign({id:usuario.id}, process.env.SECRET, {expiresIn: '60m'});//em segundos
            delete usuario.senha
            delete usuario.links
            res.status(200).json({autenticado:true,token:token,usuario});
            /* #swagger.responses[200] = {
                    description: 'Usuário autenticado com sucesso.',
                    schema: {
                        autenticado : true,
                        token : 'string',
                        usuario : { email : }
                    }
            } */
        }
        else{
            res.status(401).json({erro:'E-mail ou senha incorreto'});
        }
    } catch (error) {
        res.status(401).json({erro:error});
    }
}




export default {cadastrarUsuario, autenticaUsuario};