import dotenv from 'dotenv';
import app from './src/app.js'; //quando eh import precisa da extensao arquivo

dotenv.config();
var args = process.argv;
let port = args[2] || 3000
//const port = 3000; //or process.env.PORT

app.listen(port, () => {
    console.log(`Servidor escutando na porta http://localhost:${port}`)  
})
