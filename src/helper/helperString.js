function comparaDuasFrases(frase, fraseSemEspaco){
    frase = frase.toUpperCase().split(' ');
    fraseSemEspaco = fraseSemEspaco.toUpperCase();
    let quantidadePalavrasEncontrada = 0;
    let quantidadePalavrasErradas = 0;

    frase.forEach(palavra => {
        if(fraseSemEspaco.includes(palavra)){
            quantidadePalavrasEncontrada++;
        }
        else{
            quantidadePalavrasErradas++
        }
    })
    return {quantidadePalavrasEncontrada,quantidadePalavrasErradas}
}

export default {comparaDuasFrases}