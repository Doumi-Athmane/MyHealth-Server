import db from '../models/index.js'
const specialite = db.specialite;

// Find all specialites
const getAllSpecialites = async(req, res) => {
        try {
            const specialites = await specialite.findAll();
            res.status(200).send(specialites);
        } catch (err) {
            res.status(404).send({
                error: err.message
            });
        }
    }
    // Find specialite with id
const getSpecialiteByID = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const specialite = await Specialite.findAll({
            where: {
                idhopital: req.params.id,
            },
        });
        res.status(200).send(specialite);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Create specialite
const creatSpecialite = async(req, res) => {
    if (!req.body.nomspecialite) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const data = await Specialite.create(req.body.nomspecialite);
        res.status(200).send({ id: data.idspecialite });
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Update specialite infos
const updateSpecialite = async(req, res) => {
    if (!req.body.nomspecialite) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }

    try {
        const updatespecialite = Specialite.update(
            req.body.nomspecialite, {
                where: {
                    idspecialite: req.body.id,
                }
            }
        )
        res.status(200).send({ id: updatehopital.idspecialite });
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//delete specialite
const deleteSpecialite = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const specialite = await Specialite.delete({
            where: {
                idspecialite: req.params.id,
            },
        });
        res.status(200).send(specialite);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

export default {
    getAllSpecialites,
    getSpecialiteByID,
    creatSpecialite,
    updateSpecialite,
    deleteSpecialite
}