import express from 'express';
import jogoController from '../controllers/JogoController.js'

const router = express.Router();

router
    .post('/atualizarListaJogos', jogoController.atualizarListaJogos)


export default router

