import axios from 'axios'
import urls from '../config/Urls.js'

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
    results.items.forEach(usuario => {
        if (usuario.email === email){
            return true
        }
    });
    return false
}

async function cadastrarUsuario (nome, email, senha){
    if(!isEmailCadastrado(email)){
        //criptografar senha
        let usuario = usuario(nome, email, senha);
        let retorno;
        try {
            retorno = await axios.post(urls.postUser,usuario);
        } catch (error) {
            throw 'Erro cadastrar user no BD';
        }
        return retorno.data;
    }
    else{
        throw 'E-mail já cadastrado'
    };
}

export default {cadastrarUsuario}


