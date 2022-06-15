import db from '../models/index.js'
const Medecin = db.medecin;
const Specialite = db.specialite;
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import validator from 'validator';

// Find all medecins
const getAllMedecins = async(req, res) => {
    let AllMedecin = []
    try {
        const medecins = await Medecin.findAll();
        for (const medecin of medecins) {
            const specialite = await Specialite.findOne({
                where: {
                    idspecialite: medecin.idspecialite,
                },
            });
            let medecinSpec = {
                id: 0,
                nom: "",
                prenom: "",
                adresse: "",
                numeroDeTelephone: "",
                email: "",
                idspecialite: 0,
                idhopital: 0,
                specialite: "",
            }
            if (specialite) {
                medecinSpec.id = medecin.id
                medecinSpec.nom = medecin.nom
                medecinSpec.prenom = medecin.prenom
                medecinSpec.adresse = medecin.adresse
                medecinSpec.numeroDeTelephone = medecin.numeroDeTelephone
                medecinSpec.email = medecin.email
                medecinSpec.idspecialite = medecin.idspecialite
                medecinSpec.idhopital = medecin.idhopital
                medecinSpec.specialite = specialite.nomspecialite

                AllMedecin.push(medecinSpec)
            }
        };
        res.status(200).send(AllMedecin);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

// Find medecin with id
const getMedecinByID = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const medecin = await Medecin.findAll({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send(medecin);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Create medecin
const creatMedecin = async(req, res) => {

    if (!req.body.nom || !req.body.prenom || !req.body.numeroDeTelephone || !req.body.email) {
        res.status(400).send({
            message: "parameters can't be empty!"
        });
        return;
    }
    if (validator.isEmail(req.body.email) === false) {
        res.status(500).send({
            message: "L'email est non valide !"
        });
        return;
    }
    const medecin_0 = await Medecin.findOne({ where: { email: req.body.email } })
    if (medecin_0) {
        res.status(400).send({ message: "Email déja existé " })
        return;
    }
    const medecin = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        numero_de_telephone: req.body.numeroDeTelephone,
        adresse: req.body.adresse,
        email: req.body.email,
        mot_de_passe: req.body.motDePasse,
        idspecialite: req.body.idspecialite,
        idhopital: req.body.idhopital,
    };
    //save in bdd

    //hasher le mot de passe
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(medecin.mot_de_passe, salt);
    medecin.mot_de_passe = hash;
    try {
        const data = await Medecin.create(medecin);
        res.status(200).send({ id: data.id });
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Update medecin infos
const updateMedecin = async(req, res) => {
    if (!req.body.nom || !req.body.prenom || !req.body.numeroDeTelephone || !req.body.email) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const medecin = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        numero_de_telephone: req.body.numeroDeTelephone,
        adresse: req.body.adresse,
        email: req.body.email,
        mot_de_passe: req.body.motDePasse,
        idspecialite: req.body.idspecialite,
        idhopital: req.body.idhopital,
    };
    try {
        const updatemedecin = await Medecin.update(
            medecin, {
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

//delete medecin
const deleteMedecin = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const medecin = await Medecin.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(medecin);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

const loginMedecin = async(req, res) => {
    const { email, motDePasse } = req.body;

    if (!email || !motDePasse) {
        res.status(400).send({ success: false, error: "Please provide and email and password" })
    }
    // check for admin
    else {
        const medecin = await Medecin.findOne({ where: { email: email } })
        if (!medecin) {
            res.status(401).send({ success: false, error: "Invalid credentials" })
        } else {

            const motdepasseCorrect = await bcrypt.compare(motDePasse, medecin.mot_de_passe);

            if (!motdepasseCorrect) {
                res.status(401).send({ success: false, error: "Invalid credentials" })

            } else {
                var token = jwt.sign({ id: medecin.id }, 'secret');
                return res.status(200).send({ id: medecin.id, email: medecin.email, accessToken: token, role: 'medecin' });
                //console.log("locataires connection established!")

            }
        }
    }
}

const getMedecinSpec = async(req, res) => {
    let medecinSpec = {
        id: 0,
        nom: "",
        prenom: "",
        numeroDeTelephone: "",
        specialite: ""
    }
    try {
        const medecin = await Medecin.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (medecin) {

            medecinSpec.id = medecin.id
            medecinSpec.nom = medecin.nom
            medecinSpec.prenom = medecin.prenom
            medecinSpec.numeroDeTelephone = medecin.numero_de_telephone
            const specialite = await Specialite.findOne({
                where: {
                    idspecialite: medecin.idspecialite,
                },
            });
            if (specialite) {
                medecinSpec.specialite = specialite.nomspecialite
            }
        }
        res.status(200).send(medecinSpec);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

const updateMedecinParams = async(req, res) => {
    if (!req.body.email || !req.body.motDePasse) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }

    const patient_1 = await Medecin.findOne({ where: { email: req.body.email } })
    if (!patient_1) {
        res.status(401).send(false)
    } else {

        const motdepasseCorrect = await bcrypt.compare(req.body.motDePasse, patient_1.mot_de_passe);
        if (motdepasseCorrect) {

            const patient = {
                motDePasse: req.body.motDePasseNew ? req.body.motDePasseNew : req.body.motDePasse
            };
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(patient.motDePasse, salt);
            patient.motDePasse = hash;
            try {
                const updatemedein = await Medecin.update(
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

export default {
    getAllMedecins,
    getMedecinByID,
    creatMedecin,
    updateMedecin,
    deleteMedecin,
    loginMedecin,
    getMedecinSpec,
    updateMedecinParams
}