import express from 'express';
import swaggerUi from 'swagger-ui-express';
import jogosRoutes from './JogoRoutes.js';
import placaRoutes from './PlacaDeVideoRoutes.js';
import montaPcRoutes from './MontaPcRoutes.js';
import usuarioRoutes from './UsuarioRoutes.js';
import favoritoRoutes from './FavoritoRoutes.js';
import swaggerFile from './../../swagger_output.json' assert { type: "json" };


const routes = (app) => {
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile))
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

