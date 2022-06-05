import db from '../models/index.js'
const Patient = db.patient;
const Medecin = db.medecin;

import bcrypt from 'bcrypt'

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
        const patient = await Patient.findOne({
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

const getPatientMedByID = async(req, res) => {
    let ptientMed = {
        id: 0,
        nom: "",
        prenom: "",
        age: 0,
        sexe: "",
        adresse: "",
        numeroDeTelephone: "",
        email: "",
        id_medecin: "",
        idhopital: 0,
        nom_medecin: "",
        prenom_medecin: ""
    }
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const patient = await Patient.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (patient) {
            ptientMed.id = patient.id
            ptientMed.nom = patient.nom
            ptientMed.prenom = patient.prenom
            ptientMed.age = patient.age
            ptientMed.sexe = patient.sexe
            ptientMed.adresse = patient.adresse
            ptientMed.numeroDeTelephone = patient.numeroDeTelephone
            ptientMed.email = patient.email
            ptientMed.id_medecin = patient.id_medecin
            ptientMed.idhopital = patient.idhopital

            const medecin = await Medecin.findOne({
                where: {
                    id: patient.id_medecin,
                },
            });
            if (medecin) {
                ptientMed.nom_medecin = medecin.nom
                ptientMed.prenom_medecin = medecin.prenom
            }
        }
        res.status(200).send(ptientMed);
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
        age: req.body.age,
        sexe: req.body.sexe,
        id_medecin: req.body.id_medecin,
        idhopital: req.body.idhopital,
    };
    //hasher le mot de passe
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(patient.mot_de_passe, salt);
    patient.mot_de_passe = hash;
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
    if (!req.body.nom || !req.body.prenom || !req.body.numeroDeTelephone || !req.body.adresse || !req.body.age || !req.body.id_medecin) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const patient = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        numeroDeTelephone: req.body.numeroDeTelephone,
        adresse: req.body.adresse,
        //email: req.body.email,
        //mot_de_passe: req.body.motDePasse,
        age: req.body.age,
        sexe: req.body.sexe,
        id_medecin: req.body.id_medecin,
        //idhopital: req.body.idhopital,
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
        res.status(404).send(false);
    }
}

const updatePatientParams = async(req, res) => {
    if (!req.body.email || !req.body.motDePasse) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }

    const patient_1 = await Patient.findOne({ where: { email: req.body.email } })
    if (!patient_1) {
        res.status(401).send(false)
    } else {

        const motdepasseCorrect = await bcrypt.compare(req.body.motDePasse, patient_1.motDePasse);
        if (motdepasseCorrect) {

            const patient = {
                motDePasse: req.body.motDePasseNew ? req.body.motDePasseNew : req.body.motDePasse
            };
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(patient.motDePasse, salt);
            patient.motDePasse = hash;
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
                res.status(404).send(false);
            }
        } else res.status(401).send(false)
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

const loginPatient = async(req, res) => {
    const { email, motDePasse } = req.body;

    if (!email || !motDePasse) {
        console.log(req.body)
        res.status(400).send({ success: false, error: "Please provide and email and password" })
    }
    // check for admin
    else {
        const patient = await Patient.findOne({ where: { email: email } })
        if (!patient) {
            res.status(401).send({ success: false, error: "Invalid credentials" })
        } else {

            const motdepasseCorrect = await bcrypt.compare(motDePasse, patient.motDePasse);

            if (!motdepasseCorrect) {
                res.status(401).send({ success: false, error: "Invalid credentials" })

            } else {
                //const token = jwt.sign({ id: locataire.idLocataire, role: "locataire" }, process.env.JWT_SECRET);
                //.send({ success: true, id: patient.id }); //, token: token });
                //console.log("locataires connection established!")
                res.send(patient)

            }
        }
    }
}

const getMedecinByPatient = async(req, res) => {

}

export default {
    getAllPatients,
    getPatientByID,
    creatPatient,
    updatePatient,
    deletePatient,
    loginPatient,
    updatePatientParams,
    getPatientMedByID
}