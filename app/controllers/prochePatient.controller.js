import db from '../models/index.js'
const ProchePatient = db.prochePatient;

// Find all ProchePatients
const getAllProchePatient = async(req, res) => {
    try {
        const prochePatient = await ProchePatient.findAll();
        res.status(200).send(prochePatient);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

// Find ProchePatient with id
const getProchePatientByID = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const prochePatient = await ProchePatient.findAll({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send(prochePatient);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Create ProchePatient
const creatProchePatient = async(req, res) => {

    if (!req.body.nom || !req.body.prenom || !req.body.numeroDeTelephone || !req.body.adresse || !req.body.email || !req.body.motDePasse) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const prochePatient = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        numero_de_telephone: req.body.numeroDeTelephone,
        adresse: req.body.adresse,
        email: req.body.email,
        mot_de_passe: req.body.motDePasse,
        id_medecin: req.body.id_medecin,
        idhopital: req.body.idhopital,
    };
    try {
        const data = await ProchePatient.create(prochePatient);
        res.status(200).send({ id: data.id });
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Update ProchePatient infos
const updateProchePatient = async(req, res) => {
    if (!req.body.nom || !req.body.prenom || !req.body.numeroDeTelephone || !req.body.adresse || !req.body.email || !req.body.motDePasse) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const prochePatient = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        numero_de_telephone: req.body.numeroDeTelephone,
        adresse: req.body.adresse,
        email: req.body.email,
        mot_de_passe: req.body.motDePasse,
        id_medecin: req.body.id_medecin,
        idhopital: req.body.idhopital,
    };
    try {
        const updateprochePatient = await ProchePatient.update(
            prochePatient, {
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

//delete ProchePatient
const deleteProchePatient = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const prochePatient = await ProchePatient.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(prochePatient);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

export default {
    getAllProchePatient,
    getProchePatientByID,
    creatProchePatient,
    updateProchePatient,
    deleteProchePatient
}