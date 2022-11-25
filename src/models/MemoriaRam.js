const espacos = / /g;
const regexRam = /\d+MB|\d+GB/g ;
const conjuntoNaoNumerico = /[^0-9]/g;



function encontraMaiorMemoriaDosRequisitos (listaRequisitos){
    let listaDeRam = listaRequisitos.requisitos.map(requisito => {
        return requisito.Ram = requisito.Ram.replace(espacos,'').toUpperCase();
    });
    let listaValoresMemoria = [];
    listaDeRam.forEach(fraseRequisitoRam => {
        let arrayResults = fraseRequisitoRam.match(regexRam);
        arrayResults.forEach(e => listaValoresMemoria.push(e));
    });
    let listaMemoriasGB = listaValoresMemoria.filter(m => m.includes('GB'));
    if(listaMemoriasGB.length){
        listaMemoriasGB = listaMemoriasGB.map(m => m.replace(conjuntoNaoNumerico,''))
        return listaMemoriasGB.reduce((a,b) => Math.max(a,b)) + 'GB';
    }
    else{
        let listaMemoriasMB = listaValoresMemoria.filter(m => m.includes('MB'));
        if(listaMemoriasMB.length){
            return '8 GB';
        }
        else{
            return -1;
        }
    }
}

export default {
    encontraMaiorMemoriaDosRequisitos
}


const requisitos = {"requisitos" : [
    {
      "Armazenamento": " 100 GB available space",
      "Cpu": " Intel Core i5-2500K@3.3GHz or AMD FX 6300@3.5GHz",
      "Gpu": " Nvidia GeForce GTX 780 (3 GB) or AMD Radeon R9 290 (4GB)",
      "Ram": " 512 MB RAM"
    },
    {
      "Armazenamento": " 70 GB available space",
      "Cpu": " Intel i5-2500k (4 core 3.3 GHz) or AMD Ryzen 3 1200 (4 core 3.1 GHz)",
      "Gpu": " NVIDIA GTX 960 (4 GB) or AMD R9 290X (4 GB)",
      "Ram": " 256 MB RAM"
    },
    {
      "Armazenamento": "undefined",
      "Cpu": " Intel P4 1.8 Ghz or AMD Athlon XP 2200",
      "Gpu": " ATI X1300 with 256MB of ram, or Nvidia FX5800",
      "Ram": " 512MB of ram, 1052MB for Vista"
    },
    {
      "Armazenamento": " 70 GB available space",
      "Cpu": " Intel Core i5-3570K or AMD FX-8310",
      "Gpu": " NVIDIA GeForce GTX 970 or AMD Radeon RX 470",
      "Ram": " 256 MB RAM"
    },
    {
      "Armazenamento": " 30 GB available space",
      "Cpu": " Intel i5 3570K / AMD FX-8350",
      "Gpu": " GTX 770 with 2GB VRAM / Radeon R9 280X 3GB",
      "Ram": " 256 MB RAM"
    }
  ]
}

encontraMaiorMemoriaDosRequisitos(requisitos)