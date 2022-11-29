import express from 'express';
import jogosRoutes from './JogoRoutes.js';
import placaRoutes from './PlacaDeVideoRoutes.js';
import montaPcRoutes from './MontaPcRoutes.js';
import usuarioRoutes from './UsuarioRoutes.js'
import favoritoRoutes from './FavoritoRoutes.js'


const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send('Bem vindo ao servidor do PCbuild!')
    })
    app.use(
        express.json(),
        jogosRoutes,
        placaRoutes, 
        montaPcRoutes,
        usuarioRoutes,
        favoritoRoutes
    )

}


export default routes

