import db from '../models/index.js'
const HopitalHasSpecialite = db.hopitalHasSpecialite;


const getAllhopitalBySpecialite = async(req, res) => {
    if (!req.params.idspecialite) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const hopitalHasSpecialite = await HopitalHasSpecialite.findAll({
            where: {
                idspecialite: req.params.idspecialite,
            },
        });
        res.status(200).send(hopitalHasSpecialite);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

const getAllspecialiteByHopital = async(req, res) => {
    if (!req.params.idhopital) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const hopitalHasSpecialite = await HopitalHasSpecialite.findAll({
            where: {
                idhopital: req.params.idhopital,
            },
        });
        res.status(200).send(hopitalHasSpecialite);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

const creatHopitalHasSpecialite = async(req, res) => {

    if (!req.body.idhopital || !req.body.idspecialite) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const hopitalHasSpecialite = {
        idhopital: req.body.idhopital,
        idspecialite: req.body.idspecialite,

    };
    try {
        const data = await HopitalHasSpecialite.create(hopitalHasSpecialite);
        res.status(200).send({ id: data.idhopital });
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}
const deleteHopitalHasSpecialite = async(req, res) => {
    if (!req.params.idhopital || !req.body.idspecialite) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const hopitalHasSpecialite = await HopitalHasSpecialite.destroy({
            where: {
                idhopital: req.params.idhopital,
                idspecialite: req.params.idspecialite
            },
        });
        res.status(200).json(hopitalHasSpecialite);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

export default {
    getAllhopitalBySpecialite,
    getAllspecialiteByHopital,
    creatHopitalHasSpecialite,
    deleteHopitalHasSpecialite
}