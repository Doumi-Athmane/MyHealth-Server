import db from '../models/index.js'
const Patient = db.patient;

// Find all patients
const getAllPatients = async(req, res) => {
    try {
        const patient = await Patient.findAll();
        res.status(200).send(patient);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

// Find patient with id
const getPatientByID = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const patient = await Patient.findAll({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send(patient);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Create patient
const creatPatient = async(req, res) => {

    if (!req.body.nom || !req.body.prenom || !req.body.numeroDeTelephone || !req.body.adresse || !req.body.email || !req.body.motDePasse) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const patient = {
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
        const data = await Patient.create(patient);
        res.status(200).send({ id: data.id });
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Update patient infos
const updatePatient = async(req, res) => {
    if (!req.body.nom || !req.body.prenom || !req.body.numeroDeTelephone || !req.body.adresse || !req.body.email || !req.body.motDePasse) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const patient = {
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
        const updatemedein = await Patient.update(
            patient, {
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

//delete patient
const deletePatient = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const patient = await Patient.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(patient);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

export default {
    getAllPatients,
    getPatientByID,
    creatPatient,
    updatePatient,
    deletePatient
}