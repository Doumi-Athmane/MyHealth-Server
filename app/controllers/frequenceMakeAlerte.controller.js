import db from '../models/index.js'
const FrequanceMakeAlerte = db.frequanceMakeAlerte;


const getAllfrequenceByAlerte = async(req, res) => {
    if (!req.params.id_alerte) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const frequanceMakeAlerte = await FrequanceMakeAlerte.findAll({
            where: {
                id_alerte: req.params.id_alerte,
            },
        });
        res.status(200).send(frequanceMakeAlerte);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

const getAlerteByFrequance = async(req, res) => {
    if (!req.params.id_frequance) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const frequanceMakeAlerte = await FrequanceMakeAlerte.findAll({
            where: {
                id_frequance: req.params.id_frequance,
            },
        });
        res.status(200).send(frequanceMakeAlerte);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

const creatFrequanceMakeAlerte = async(req, res) => {

    if (!req.body.id_alerte || !req.body.id_frequance) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const frequanceMakeAlerte = {
        id_alerte: req.body.id_alerte,
        id_frequance: req.body.id_frequance,

    };
    try {
        const data = await FrequanceMakeAlerte.create(frequanceMakeAlerte);
        res.status(200).send({ id: data.id_alerte });
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}
const deleteFrequanceMakeAlerte = async(req, res) => {
    if (!req.params.id_alerte || !req.body.id_frequance) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const frequanceMakeAlerte = await FrequanceMakeAlerte.destroy({
            where: {
                id_alerte: req.body.id_alerte,
                id_frequance: req.body.id_frequance,
            },
        });
        res.status(200).json(frequanceMakeAlerte);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

export default {
    getAlerteByFrequance,
    getAllfrequenceByAlerte,
    creatFrequanceMakeAlerte,
    deleteFrequanceMakeAlerte
}