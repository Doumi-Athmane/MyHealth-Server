import db from '../models/index.js'
const Admin = db.admin;

// Find all admins
const getAllAdmins = async(req, res) => {
    try {
        const admin = await Admin.findAll();
        res.status(200).send(admin);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

// Find admin with id
const getAdminByID = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const admin = await Admin.findAll({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send(admin);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Create admin
const creatAdmin = async(req, res) => {

    if (!req.body.nom || !req.body.prenom || !req.body.numeroDeTelephone || !req.body.adresse || !req.body.email || !req.body.motDePasse) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const admin = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        numero_de_telephone: req.body.numeroDeTelephone,
        adresse: req.body.adresse,
        email: req.body.email,
        mot_de_passe: req.body.motDePasse,
        idhopital: req.body.idhopital,
    };
    try {
        const data = await Admin.create(admin);
        res.status(200).send({ id: data.id });
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

//Update admin infos
const updateAdmin = async(req, res) => {
    if (!req.body.nom || !req.body.prenom || !req.body.numeroDeTelephone || !req.body.adresse || !req.body.email || !req.body.motDePasse) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    const admin = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        numero_de_telephone: req.body.numeroDeTelephone,
        adresse: req.body.adresse,
        email: req.body.email,
        mot_de_passe: req.body.motDePasse,
        idhopital: req.body.idhopital,
    };
    try {
        const updateAdmin = await Admin.update(
            admin, {
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

//delete admin
const deleteAdmin = async(req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }
    try {
        const admin = await Admin.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(admin);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
}

export default {
    getAllAdmins,
    getAdminByID,
    creatAdmin,
    updateAdmin,
    deleteAdmin
}