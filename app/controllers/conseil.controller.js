import db from '../models/index.js'
const Conseil = db.conseil;
const Medecin = db.medecin;


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
        res.status(200).send(true);
    } catch (err) {
        res.status(404).send(false);
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

const getConseilMedecin = async(req, res) => {
    let conseilMedecins = []
    try {
        const conseils = await Conseil.findAll({
            where: {
                id_patient: req.params.id,
            },
            /*include: [{
                model: Medecin,
                required: true,
            }]*/

        });
        var conteur = 0
        if (conseils) {
            for (const conseil of conseils) {
                let conseilMedecin = {
                    id: 0,
                    id_medecin: 0,
                    nom: "",
                    prenom: "",
                    text: ""
                }
                const medecin = await Medecin.findOne({
                    where: {
                        id: conseil.id_medecin,
                    }
                });
                console.log(medecin.nom)
                conseilMedecin.id = conseil.id
                conseilMedecin.id_medecin = conseil.id_medecin
                conseilMedecin.nom = medecin.nom
                conseilMedecin.prenom = medecin.prenom
                conseilMedecin.text = conseil.text

                conseilMedecins.push(conseilMedecin)
                conteur++
            };
        }
        res.status(200).send(conseilMedecins);
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
    deleteConseil,
    getConseilMedecin
}
