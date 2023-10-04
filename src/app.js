import express from 'express'
import routes from './routes/index.js';

const app = express(); //instancia o express
routes(app); //passa o app para o index


export default app //exportar para outros arquivos poderem usar


