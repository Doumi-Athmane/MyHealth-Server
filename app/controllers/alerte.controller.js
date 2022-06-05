import FCM from 'fcm-node/lib/fcm.js';
import db from '../models/index.js'
const Alerte = db.alerte;
const FrequanceMakeAlerte = db.frequanceMakeAlerte;

import { Op } from 'sequelize';


const secretFirebase = "AAAAgn1mtyw:APA91bGIglw-JKE9Z2b3OUT6aIBVNjKPbVEww26832v5jufTGPJJTWKZlZt3xOMVAW_PfEmheoMZFvKPRFUZsr7yl66hHyJ0LMOHPTRu6ivia6vfd7unHglTgRTXVvmVLjKni8JC7uhu"

// Find all alerte by ID_Patient
const getAllAlerteByIDPatient = async(req, res) => {
    if (!req.params.id_patient) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const alerte = await Alerte.findAll({
            where: {
                id_patient: req.params.id_patient,
            },
        });
        res.status(200).send(alerte);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

const getLastAlerteByIDPatient = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    let alert = {
        titre: "",
        message: "",
        id_patient: 0,
        id_medecin: 0,
        time: 0

    }
    try {

        const alerte = await Alerte.findOne({
            where: {
                id_patient: req.params.id,
                time: {
                    [Op.lt]: Date.now() + 60000,
                    [Op.gt]: Date.now() - 60000
                }

            },
        });
        if (alerte == null) {
            res.status(200).send(alert);

        } else {
            res.status(200).send(alerte);
        }
    } catch (err) {
        res.status(404).send(alert);
    }
}

// Find all alerte by ID_medecin
const getAllAlerteByIDMedecin = async(req, res) => {
    if (!req.params.id_medecin) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const alerte = await Alerte.findAll({
            where: {
                id_medecin: req.params.id_medecin,
            },
        });
        res.status(200).send(alerte);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

// Find alerte with id
const getAlerteByID = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const alerte = await Alerte.findAll({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send(alerte);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Create alerte
const creatAlerte = async(req, res) => {

    if (!req.body.titre || !req.body.message || !req.body.id_patient || !req.body.id_medecin) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }

    const alerte = {
        titre: req.body.titre,
        time: Date.now(),
        message: req.body.message,
        id_patient: req.body.id_patient,
        id_medecin: req.body.id_medecin
    };
    try {
        const data = await Alerte.create(alerte);
        if (data) {
            const frequanceMakeAlerte = {
                id_alerte: data.id,
                id_frequance: req.params.id_frequance,

            };
            try {
                const data2 = await FrequanceMakeAlerte.create(frequanceMakeAlerte);
                res.status(200).send(true);
            } catch (err) {
                res.status(404).send(false);
            }
        }
    } catch (err) {
        res.status(404).send(err);
    }
    /*try {
        // const data = await Alerte.create(alerte);
        let fcm = new FCM(secretFirebase)
        let message = {
            topic: '/topics/patient/', //+ req.body.id_patient,
            to: '/topics/patient/',
            notification: {
                title: "Alerte fréqunce cardiaque",
                body: req.body.message,
                sound: 'default',
            }
        }
        fcm.send(message, (err, response) => {
            if (err) {
                res.status(404).send(err);

            } else {
                res.status(200).send(true);
            }
        })
    } catch (err) {
        res.status(404).send(false);
    }*/
}

//delete alerte
const deleteAlerte = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const alerte = await Alerte.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(alerte);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

export default {
    getAlerteByID,
    getAllAlerteByIDMedecin,
    getAllAlerteByIDPatient,
    creatAlerte,
    deleteAlerte,
    getLastAlerteByIDPatient
}