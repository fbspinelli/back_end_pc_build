import express from 'express';
import placaDeVideoController from '../controllers/PlacaDeVideoController.js';

const router = express.Router();

router
    .post('/calcularPlacaDeVideo', (req, res) => placaDeVideoController.calculaPlacaDeVideo(req,res))

    
export default router