import express from 'express'
import routes from './routes/index.js';
import swaggerAutogen from 'swagger-autogen'

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/*']

const app = express(); //instancia o express
routes(app); //passa o app para o index


export default app //exportar para outros arquivos poderem usar


