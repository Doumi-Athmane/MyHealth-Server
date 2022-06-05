import db from '../models/index.js'
const Medecin = db.medecin;
const Specialite = db.specialite;
import bcrypt from 'bcrypt'

// Find all medecins
const getAllMedecins = async(req, res) => {
    try {
        const medecins = await Medecin.findAll();
        res.status(200).send(medecins);
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

    if (!req.body.nom || !req.body.prenom || !req.body.numeroDeTelephone || !req.body.adresse || !req.body.email || !req.body.motDePasse) {
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
    //hasher le mot de passe
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(medecin.mot_de_passe, salt);
    medecin.mot_de_passe = hash;
    try {
        console.log(medecin)

        const data = await Medecin.create(medecin);
        res.status(200).send({ id: data.id });
    } catch (err) {
        console.log(err)
        res.status(404).send({
            error: err.message
        });
    }
}

//Update medecin infos
const updateMedecin = async(req, res) => {
    if (!req.body.nom || !req.body.prenom || !req.body.numeroDeTelephone || !req.body.adresse || !req.body.email || !req.body.motDePasse) {
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
        const updatemedein = await Medecin.update(
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
                //const token = jwt.sign({ id: locataire.idLocataire, role: "locataire" }, process.env.JWT_SECRET);
                res.send({ success: true, id: medecin.id }); //, token: token });
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

export default {
    getAllMedecins,
    getMedecinByID,
    creatMedecin,
    updateMedecin,
    deleteMedecin,
    loginMedecin,
    getMedecinSpec
}