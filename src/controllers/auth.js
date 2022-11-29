import jwt from 'jsonwebtoken'

function verificaJWT(req, res, next){
    const token = req.headers['tokenjwt'];
    if (!token){
        return res.status(401).json({ auth: false, message: 'Token não fornecido'});       
    };
    let payload;
    try {
        payload = jwt.verify(token, process.env.SECRET);
        if(!payload){
            return res.status(401).json({ auth: false, message: 'Token inválido'});
        }
    } catch (error) {
        return res.status(500).json({
            auth: false,
            message:"Erro ao processar o token"
        });
    }
    next();
}

export default verificaJWT