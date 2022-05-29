import db from '../models/index.js'
const AlerteForProche = db.alerteForProche;


const getAllalerteByProche = async(req, res) => {
    if (!req.params.id_proche) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const alerteForProche = await AlerteForProche.findAll({
            where: {
                id_proche: req.params.id_proche,
            },
        });
        res.status(200).send(alerteForProche);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}


const creatAlerteForProche = async(req, res) => {

    if (!req.body.id_alerte || !req.body.id_proche) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const alerteForProche = {
        id_alerte: req.body.id_alerte,
        id_proche: req.body.id_proche,

    };
    try {
        const data = await AlerteForProche.create(alerteForProche);
        res.status(200).send({ id: data.id_alerte });
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}
const deleteAlerteForProche = async(req, res) => {
    if (!req.params.id_alerte || !req.body.id_proche) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const alerteForProche = await AlerteForProche.destroy({
            where: {
                id_alerte: req.body.id_alerte,
                id_proche: req.body.id_proche,
            },
        });
        res.status(200).json(alerteForProche);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

export default {
    getAllalerteByProche,
    creatAlerteForProche,
    deleteAlerteForProche
}