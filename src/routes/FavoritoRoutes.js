import express from 'express';
import favoritaController from '../controllers/FavoritaPcController.js'

const router = express.Router();

router
    .post('/favoritarPc', (req, res) => favoritaController.favoritaPc(req, res))


export default router

