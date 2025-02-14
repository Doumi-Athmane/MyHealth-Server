import db from '../models/index.js'
const FrequanceCardiaque = db.frequanceCardiaque;

// Find all frequanceCardiaque by ID_Patient
const getAllFrequanceCardiqueByIDPatient = async(req, res) => {
    if (!req.params.id_patient) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const frequanceCardiaque = await FrequanceCardiaque.findAll({
            where: {
                id_patient: req.params.id_patient,
            },
        });
        res.status(200).send(frequanceCardiaque);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

// Find frequanceCardiaque with id
const getFrequanceCardiaqueByID = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const frequanceCardiaque = await FrequanceCardiaque.findAll({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send(frequanceCardiaque);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Create frequanceCardiaque
const creatFrequanceCardiaque = async(req, res) => {

    if (!req.body.valeur || !req.body.temps || !req.body.id_patient) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const frequanceCardiaque = {
        valeur: req.body.valeur,
        id_patient: req.body.id_patient,
        traiter: req.body.traiter ? req.body.traiter : false,
        genererAlerte: req.body.genererAlerte ? req.body.genererAlerte : false
    };
    try {
        const data = await FrequanceCardiaque.create(frequanceCardiaque);
        const id = data.id;
        res.status(200).send('' + id);
    } catch (err) {
        res.status(404).send(0);
    }
}

//delete frequanceCardiaque
const deleteFrequanceCardiaque = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const frequanceCardiaque = await FrequanceCardiaque.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(frequanceCardiaque);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

export default {
    getAllFrequanceCardiqueByIDPatient,
    getFrequanceCardiaqueByID,
    creatFrequanceCardiaque,
    deleteFrequanceCardiaque
}