import express from 'express';
import jogosRoutes from './JogoRoutes.js'
import placaRoutes from './PlacaDeVideoRoutes.js'

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send('Bem vindo ao servidor do PCbuild!')
    })
    app.use(
        express.json(),
        jogosRoutes, //para direcionar as requisões que não seja para o '/' para cá
        placaRoutes //para direcionar as requisões que não seja para o 'jogosRoutes' e '/' para cá
    )
}


export default routes

