import axios from 'axios'
import bcrypt from 'bcrypt'
import urls from '../config/Urls.js'
const salt = bcrypt.genSaltSync(10);



function usuario (nome, email, senha){
    let usuario = new Object();
    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = senha;
    return usuario;
}

async function consultaUsuario(id){
    let result;
    try {
        result = await axios.get(urls.getSingleUser,{id});
    } catch (error) {
        throw 'Erro ao pesquisar usuario no BD por ID'
    }
    if(result.status === 200){
        return result.data;
    }
    if (result.status === 404){
        return null;
    }
}

async function isEmailCadastrado(email){
    let results;
    try {
        results = await axios.get(urls.getAllUsers);
    } catch (error) {
        throw 'Erro ao listar usuarios do BD'
    }
    return !(results.data.items.every(usuario => usuario.email != email));
}

async function buscaUsuarioPorEmail(email){
    let results;
    try {
        results = await axios.get(urls.getAllUsers);
    } catch (error) {
        throw 'Erro ao listar usuarios do BD'
    }
    return results.data.items.find(usuario => usuario.email === email);
}

async function cadastraUsuario (nome, email, senha){
    if(! await isEmailCadastrado(email)){
        senha = bcrypt.hashSync(senha, salt);
        let user = usuario(nome, email, senha);
        let retorno;
        try {
            retorno = await axios.post(urls.postUser, user);
            delete retorno.data.senha
            delete retorno.data.links
        } catch (error) {
            throw 'Erro cadastrar user no BD';
        }
        return retorno.data;
    }
    else{
        throw 'E-mail já cadastrado'
    };
}

async function usuarioPossuiPermissao(email,senha){
    let usuario = await buscaUsuarioPorEmail(email);
    try {
        if((usuario != undefined) && bcrypt.compareSync(senha,usuario.senha)){
            return usuario
        }
    } catch(er){
        throw 'Falha ao autenticar senha ou e-mail'
    }
    return false
}

export default {cadastraUsuario, usuarioPossuiPermissao, buscaUsuarioPorEmail}


