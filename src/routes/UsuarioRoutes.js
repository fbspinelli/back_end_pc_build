import {Router} from "express";
import usuarioController from '../controllers/UsuarioController.js'

const router = Router();

router
    .post('/usuario/cadastro', (req, res) => usuarioController.cadastrarUsuario(req, res))

    

export default router
