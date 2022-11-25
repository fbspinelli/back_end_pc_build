const espacos = / /g;
const regexRom = /\d+MB|\d+GB|\d+TB/g ;
const conjuntoNaoNumerico = /[^0-9]/g;
const ssdsGB = [120, 240, 480, 960, 2000];


function somaArmazenamentoRequisitos (listaRequisitos){
    let listaDeRoms = listaRequisitos.map(requisito => {
        return requisito.Armazenamento = requisito.Armazenamento?.replace(espacos,'')?.toUpperCase();
    });
    let listaValoresRom = [];
    listaDeRoms.forEach(fraseRequisitoRom => {
        let arrayResultsMatchs = fraseRequisitoRom.match(regexRom);
        if(!(arrayResultsMatchs === null)){
            arrayResultsMatchs.forEach(e =>  listaValoresRom.push(e))
        }
    });
    listaValoresRom = listaValoresRom.map(rom => {
        if(rom.includes('MB')){
            rom.replace(conjuntoNaoNumerico,'');
            rom = rom * 0.001; //conversao de MB para GB
            return rom;
        }
        if(rom.includes('TB')){
            rom.replace(conjuntoNaoNumerico,'');
            rom = rom * 1000; //conversao de TB para GB
            return rom;
        }
        return parseInt(rom.replace(conjuntoNaoNumerico,''));
    })
    let totalGBs = listaValoresRom.reduce((acumulador, atual) => acumulador + atual);
    return ssdsGB.find(ssd => ssd >= totalGBs);
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

somaArmazenamentoRequisitos(requisitos.requisitos)

export default {
    somaArmazenamentoRequisitos
}