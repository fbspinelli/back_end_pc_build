import {Router} from "express";
import usuarioController from '../controllers/UsuarioController.js'

const router = Router();

router
    .post('/usuario/cadastro', (req, res) => usuarioController.cadastrarUsuario(req, res))
    .post('/usuario/autentica', (req, res) => usuarioController.autenticaUsuario(req, res))
    

export default router
