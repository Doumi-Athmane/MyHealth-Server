import db from '../models/index.js'
const Message = db.message;

/*const getAllConseils = async(req, res) => {
    try {
        const conseil = await Conseil.findAll();
        res.status(200).send(conseil);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}*/

const getAllMessageByMedecin = async(req, res) => {
    try {
        const message = await Message.findAll({
            where: { id_medecin: req.params.id }
        });
        res.status(200).send(message);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

const creatMessage = async(req, res) => {

    if (!req.body.text || !req.body.id_medecin || !req.body.id_patient) {
        res.status(400).send({
            message: "parameters can't be empty!3"
        })
        return;
    }
    const message = {
        text: req.body.text,
        id_medecin: req.body.id_medecin,
        id_patient: req.body.id_patient,
    };
    try {
        const data = await Message.create(message);
        res.status(200).send(true);
    } catch (err) {
        res.status(404).send(false);
    }
}

export default {
    getAllMessageByMedecin,
    creatMessage
}