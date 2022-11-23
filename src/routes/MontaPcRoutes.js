import express from 'express';
import montaPcController from '../controllers/MontaPcController.js';

const router = express.Router();

router
    .post('/montaPc', (req, res) => montaPcController.montaPC(req,res))

    
export default router