import db from '../models/index.js'
const Medecin = db.medecin;

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

export default {
    getAllMedecins,
    getMedecinByID,
    creatMedecin,
    updateMedecin,
    deleteMedecin
}