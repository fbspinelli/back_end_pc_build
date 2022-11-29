import express from 'express';
import favoritaController from '../controllers/FavoritaPcController.js'
import auth from '../controllers/auth.js'

const router = express.Router();

router
    .post('/favoritaPc', auth,(req, res) => favoritaController.favoritaPc(req, res))


export default router

