import db from '../models/index.js'
const Alerte = db.alerte;

// Find all alerte by ID_Patient
const getAllAlerteByIDPatient = async(req, res) => {
    if (!req.params.id_patient) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const alerte = await Alerte.findAll({
            where: {
                id_patient: req.params.id_patient,
            },
        });
        res.status(200).send(alerte);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

// Find all alerte by ID_medecin
const getAllAlerteByIDMedecin = async(req, res) => {
    if (!req.params.id_medecin) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const alerte = await Alerte.findAll({
            where: {
                id_medecin: req.params.id_medecin,
            },
        });
        res.status(200).send(alerte);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

// Find alerte with id
const getAlerteByID = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const alerte = await Alerte.findAll({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send(alerte);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Create alerte
const creatAlerte = async(req, res) => {

        if (!req.body.titre || !req.body.message || !req.body.id_patient || !req.body.id_medecin) {
            res.status(400).send({
                message: "parameters can't be empty!"
            })
            return;
        }
        var d = new Date();
        d = new Date(d.getTime() - 3000000);
        var date_format_str = d.getFullYear().toString() + "-" + ((d.getMonth() + 1).toString().length == 2 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1).toString()) + "-" + (d.getDate().toString().length == 2 ? d.getDate().toString() : "0" + d.getDate().toString()) + " " + (d.getHours().toString().length == 2 ? d.getHours().toString() : "0" + d.getHours().toString()) + ":" + ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2 ? (parseInt(d.getMinutes() / 5) * 5).toString() : "0" + (parseInt(d.getMinutes() / 5) * 5).toString());
        console.log(date_format_str)
        const alerte = {
            titre: req.body.titre,
            //temps: date_format_str.toString(),
            message: req.body.message,
            id_patient: req.body.id_patient,
            id_medecin: req.body.id_medecin
        };
        try {
            const data = await Alerte.create(alerte);
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
    //delete alerte
const deleteAlerte = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const alerte = await Alerte.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(alerte);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

export default {
    getAlerteByID,
    getAllAlerteByIDMedecin,
    getAllAlerteByIDPatient,
    creatAlerte,
    deleteAlerte
}