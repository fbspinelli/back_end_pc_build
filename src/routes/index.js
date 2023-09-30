import express from 'express';
import swaggerUi from 'swagger-ui-express';
import montaPcRoutes from './MontaPcRoutes.js';
import usuarioRoutes from './UsuarioRoutes.js';
import swaggerFile from './../../swagger_output.json' assert { type: "json" };

const routes = (app) => {
    app.use(
        express.json(),
        montaPcRoutes,
        usuarioRoutes
    )
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

export default routes

