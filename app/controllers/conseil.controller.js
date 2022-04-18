import db from '../models/index.js'
const Conseil = db.conseil;

// Find all Conseils
const getAllConseils = async(req, res) => {
    try {
        const conseil = await Conseil.findAll();
        res.status(200).send(conseil);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

// Find Conseil with id
const getConseilByID = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const conseil = await Conseil.findAll({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send(conseil);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Create Conseil
const creatConseil = async(req, res) => {

    if (!req.body.text || !req.body.id_medecin || !req.body.id_patient) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const conseil = {
        text: req.body.text,
        id_medecin: req.body.id_medecin,
        id_patient: req.body.id_patient,
    };
    try {
        const data = await Conseil.create(conseil);
        res.status(200).send({ id: data.id });
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Update Conseil infos
const updateConseil = async(req, res) => {
    if (!req.body.text || !req.body.id_medecin || !req.body.id_patient) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const conseil = {
        text: req.body.text,
        id_medecin: req.body.id_medecin,
        id_patient: req.body.id_patient,
    };
    try {
        const updateconseil = await Conseil.update(
            conseil, {
                where: {
                    id: req.params.id,
                }
            }
        )
        res.status(200).send(true);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//delete conseil
const deleteConseil = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const conseil = await Conseil.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(conseil);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

export default {
    getAllConseils,
    getConseilByID,
    creatConseil,
    updateConseil,
    deleteConseil
}