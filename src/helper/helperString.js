function comparaDuasFrases(objetoProcurado, texto){
    objetoProcurado = objetoProcurado.toUpperCase().split(' ');
    texto = texto.toUpperCase();
    let quantidadePalavrasEncontrada = 0;
    let quantidadePalavrasErradas = 0;

    objetoProcurado.forEach(palavra => {
        if(texto.includes(palavra)){
            quantidadePalavrasEncontrada++;
        }
        else{
            quantidadePalavrasErradas++
        }
    })
    return {quantidadePalavrasEncontrada,quantidadePalavrasErradas}
}

export default {comparaDuasFrases}