import FCM from 'fcm-node/lib/fcm.js';
import db from '../models/index.js'
const Alerte = db.alerte;
const Patient = db.patient;
const Medecin = db.medecin;
const FrequanceMakeAlerte = db.frequanceMakeAlerte;

import { Op } from 'sequelize';


const secretFirebase = "AAAAgn1mtyw:APA91bGIglw-JKE9Z2b3OUT6aIBVNjKPbVEww26832v5jufTGPJJTWKZlZt3xOMVAW_PfEmheoMZFvKPRFUZsr7yl66hHyJ0LMOHPTRu6ivia6vfd7unHglTgRTXVvmVLjKni8JC7uhu"

// Find all alertes
const getAllAlertes = async(req, res) => {
        let AllAlertes = []
        try {
            const alertes = await Alerte.findAll();
            for (const alerte of alertes) {
                const patient = await Patient.findOne({
                    where: {
                        id: alerte.id_patient,
                    },
                });
                const medecin = await Medecin.findOne({
                    where: {
                        id: alerte.id_medecin,
                    },
                });
                let alerteMedPat = {
                    id: 0,
                    titre: "",
                    message: "",
                    temps: "",
                    id_patient: 0,
                    id_medecin: 0,
                    nom_patient: "",
                    prenom_patient: "",
                    nom_medecin: "",
                    prenom_medecin: ""
                }
                if (patient && medecin) {
                    alerteMedPat.id = alerte.id
                    alerteMedPat.titre = alerte.titre
                    alerteMedPat.message = alerte.message
                    alerteMedPat.temps = alerte.temps
                    alerteMedPat.id_medecin = alerte.id_medecin
                    alerteMedPat.id_patient = alerte.id_patient
                    alerteMedPat.nom_patient = patient.nom
                    alerteMedPat.prenom_patient = patient.prenom
                    alerteMedPat.nom_medecin = medecin.nom
                    alerteMedPat.prenom_medecin = medecin.prenom

                    AllAlertes.push(alerteMedPat)
                }
            };
            res.status(200).send(AllAlertes);
        } catch (err) {
            res.status(404).send({
                error: err.message
            });
        }
    }
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
        temps: 0,
        time: 0
    }
    try {

        const alerte = await Alerte.findOne({
            where: {
                id_patient: req.params.id,
                time: {
                    [Op.lt]: Date.now() + 10000, //60000,
                    [Op.gt]: Date.now() - 10000 //60000
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
    getAllAlertes,
    getAlerteByID,
    getAllAlerteByIDMedecin,
    getAllAlerteByIDPatient,
    creatAlerte,
    deleteAlerte,
    getLastAlerteByIDPatient

}