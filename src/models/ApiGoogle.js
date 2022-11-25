import urls from '../config/Urls.js'

async function retornaUmProdutoDaApiShopping(stringNomeProduto){
    const params = {
        api_key: "B9E7BDF7D3024533B62B918CED851541", //token autenticacao
        search_type: "shopping",
        location: "Brazil",
        q: stringNomeProduto// nome do item buscado
    }
    let resultadosGoogle = await axios.get(urls.apiGoogle,{params});
    resultadosGoogle = resultadosGoogle.shopping_results[0];
}

export default {
    retornaUmProdutoDaApiShopping
}