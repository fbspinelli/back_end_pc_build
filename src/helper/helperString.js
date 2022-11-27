function comparaDuasFrases(objetoProcurado, texto){
    objetoProcurado = objetoProcurado.toUpperCase().split(' ');
    texto = texto.toUpperCase();
    let quantidadePalavrasEncontrada = 0;
    let quantidadePalavrasErradas = 0;

    objetoProcurado.forEach(palavra => {
        if(palavra.length > 1){
            if(texto.includes(palavra)){
                quantidadePalavrasEncontrada++;
            }
            else{
                quantidadePalavrasErradas++
            }
        }
        else{
            let regexLetraAvulsa = new RegExp(` ${palavra} `);
            let resultadoMatch = texto.match(regexLetraAvulsa);
            resultadoMatch != null ? quantidadePalavrasEncontrada++ : quantidadePalavrasErradas++;
        }
    })
    return {quantidadePalavrasEncontrada,quantidadePalavrasErradas}
}

export default {comparaDuasFrases}