//controller deve conter logicas referente as entradas de dados
class PlacaDeVideoController {
    static calculaPlacaDeVideo = (req, res) => {

        //req.body.placas.length > 3


        res.status(200).json({GPU : "aqui objeto da API google", CPU : "aqui objeto da API google"});
    }
}

export default PlacaDeVideoController

