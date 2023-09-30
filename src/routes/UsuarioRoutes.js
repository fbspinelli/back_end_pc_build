import {Router} from "express";
import usuarioController from '../controllers/UsuarioController.js'
import auth from '../controllers/auth.js'
const router = Router();

router
    .post('/usuario/cadastro', (req, res) => usuarioController.cadastraUsuario(req, res))
    .post('/usuario/autentica', (req, res) => usuarioController.autenticaUsuario(req, res))

    export default router
