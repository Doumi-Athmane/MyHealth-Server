import db from '../models/index.js'
const TensionArterielle = db.tensionMakeAlerte;


const getAlltensionByAlerte = async(req, res) => {
    if (!req.params.id_alerte) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const tensionArterielle = await TensionArterielle.findAll({
            where: {
                id_alerte: req.params.id_alerte,
            },
        });
        res.status(200).send(tensionArterielle);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

const getAlerteByTension = async(req, res) => {
    if (!req.params.id_tension) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const tensionArterielle = await TensionArterielle.findAll({
            where: {
                id_tension: req.params.id_tension,
            },
        });
        res.status(200).send(tensionArterielle);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

const creatTansionMakeAlerte = async(req, res) => {

    if (!req.body.id_alerte || !req.body.id_tension) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const tensionArterielle = {
        id_alerte: req.body.id_alerte,
        id_tension: req.body.id_tension,

    };
    try {
        const data = await TensionArterielle.create(tensionArterielle);
        res.status(200).send({ id: data.id_alerte });
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}
const deleteTensionArterielle = async(req, res) => {
    if (!req.params.id_tension || !req.body.id_alerte) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const tensionArterielle = await TensionArterielle.destroy({
            where: {
                id_alerte: req.body.id_alerte,
                id_tension: req.body.id_tension,
            },
        });
        res.status(200).json(tensionArterielle);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

export default {
    getAlerteByTension,
    getAlltensionByAlerte,
    creatTansionMakeAlerte,
    deleteTensionArterielle
}