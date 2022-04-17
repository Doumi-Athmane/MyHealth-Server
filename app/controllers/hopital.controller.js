import db from '../models/index.js'
const Hopital = db.hopital;

// Find all hospitals
const getAllHopitals = async(req, res) => {
        try {
            const hopitals = await Hopital.findAll();
            res.status(200).send(hopitals);
        } catch (err) {
            res.status(404).send({
                error: err.message
            });
        }
    }
    // Find hospital with id
const getHopitalByID = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const hopital = await Hopital.findAll({
            where: {
                idhopital: req.params.id,
            },
        });
        res.status(200).send(hopital);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Create hospital
const creatHospital = async(req, res) => {
    if (!req.body.nomhopital || !req.body.wilaya || !req.body.commune || !req.body.adresse) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const hopital = {
        nomhopital: req.body.nomhopital,
        wilaya: req.body.wilaya,
        commune: req.body.commune,
        adresse: req.body.adresse,
    };
    try {
        const data = await Hopital.create(hopital);
        res.status(200).send({ id: data.idhopital });
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Update hopital infos
const updateHopital = async(req, res) => {
    if (!req.body.nomhopital || !req.body.wilaya || !req.body.commune || !req.body.adresse) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const hopital = {
        nomhopital: req.body.nomhopital,
        wilaya: req.body.wilaya,
        commune: req.body.commune,
        adresse: req.body.adresse,
    };
    try {
        const updatehopital = Hopital.update(
            hopital, {
                where: {
                    idhopital: req.body.id,
                }
            }
        )
        res.status(200).send({ id: updatehopital.idhopital });
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//delete hopital
const deleteHopital = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const hopital = await Hopital.delete({
            where: {
                idhopital: req.params.id,
            },
        });
        res.status(200).send(hopital);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

export default {
    getAllHopitals,
    getHopitalByID,
    creatHospital,
    updateHopital,
    deleteHopital
}