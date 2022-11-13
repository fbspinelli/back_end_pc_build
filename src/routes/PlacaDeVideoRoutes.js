import express from 'express';
import placaDeVideoController from '../controllers/PlacaDeVideoController.js';

const router = express.Router();

router
    .get('/calcularPlacaDeVideo', placaDeVideoController.calculaPlacaDeVideo)

    
export default router