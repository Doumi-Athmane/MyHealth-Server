import db from '../models/index.js'
const TensionArterielle = db.tensionArterielle;

// Find all TensionArterielle by ID_Patient
const getAllTensionArterielleByIDPatient = async(req, res) => {
    if (!req.params.id_patient) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const tensionArterielle = await TensionArterielle.findAll({
            where: {
                id_patient: req.params.id_patient,
            },
        });
        res.status(200).send(tensionArterielle);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

// Find TensionArterielle with id
const getTensionArterielleByID = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const tensionArterielle = await TensionArterielle.findAll({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send(tensionArterielle);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Create TensionArterielle
const creatTensionArterielle = async(req, res) => {

        if (!req.body.valeur || !req.body.temps || !req.body.id_patient) {
            res.status(400).send({
                message: "parameters can't be empty!"
            })
            return;
        }
        const tensionArterielle = {
            valeur: req.body.valeur,
            temps: req.body.temps,
            id_patient: req.body.id_patient,
            traiter: req.body.traiter ? req.body.traiter : false,
            genererAlerte: req.body.genererAlerte ? req.body.genererAlerte : false
        };
        try {
            const data = await TensionArterielle.create(tensionArterielle);
            res.status(200).send({ id: data.id });
        } catch (err) {
            res.status(404).send({
                error: err.message
            });
        }
    }
    /*
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
    */
    //delete TensionArterielle
const deleteTensionArterielle = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const tensionArterielle = await TensionArterielle.destroy({
            where: {
                id: req.params.id,
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
    getAllTensionArterielleByIDPatient,
    getTensionArterielleByID,
    creatTensionArterielle,
    deleteTensionArterielle
}