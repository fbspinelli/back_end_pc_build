import {Router} from "express";
import usuarioController from '../controllers/UsuarioController.js'
import auth from '../controllers/auth.js'
const router = Router();

router
    .post('/usuario/cadastro', (req, res) => usuarioController.cadastrarUsuario(req, res))
    .post('/usuario/autentica', (req, res) => usuarioController.autenticaUsuario(req, res))
    .post('/usuario/validaToken', auth ,(_, res) => res.status(200).json({'auth':true}));

export default router
