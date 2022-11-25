import axios from 'axios'
import urls from '../config/Urls.js'

async function retornaUmProdutoDaApiShopping(stringNomeProduto){
    const params = {
        api_key: "DA063269A54D404D964E3A312CF5342A", //token autenticacao
        search_type: "shopping",
        location: "Americo Brasiliense,State of Sao Paulo,Brazil",
        q: stringNomeProduto// nome do item buscado
    }
    let resultadosGoogle = await axios.get(urls.apiGoogle,{params});
    return resultadosGoogle.data?.shopping_results[0];
}

export default {
    retornaUmProdutoDaApiShopping
}