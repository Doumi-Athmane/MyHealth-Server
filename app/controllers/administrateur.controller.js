import db from '../models/index.js'
const Admin = db.admin;

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';



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
    if (validator.isEmail(req.body.email) === false) {
        res.status(500).send({
            message: "L'email est non valide !"
        });
        return;
    }
    const admin_0 = await Admin.findOne({ where: { email: req.body.email } })
    if (admin_0) {
        res.status(400).send({ message: "Email déja existé " })
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
    //hasher le mot de passe
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(admin.mot_de_passe, salt);
    admin.mot_de_passe = hash;
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


const loginAdmin = async(req, res) => {
    const { email, motDePasse } = req.body;

    if (!email || !motDePasse) {
        res.status(400).send({ success: false, error: "Please provide and email and password" })
    }
    // check for admin
    else {
        const admin = await Admin.findOne({ where: { email: email } })
        if (!admin) {
            res.status(401).send({ success: false, error: "Invalid credentials" })
        } else {

            const motdepasseCorrect = await bcrypt.compare(motDePasse, admin.mot_de_passe);
            console.log(motdepasseCorrect);

            if (!motdepasseCorrect) {
                res.status(401).send({ accessToken: null, error: "Invalid credentials" })

            } else {
                var token = jwt.sign({ id: admin.id }, 'secret');
                return res.status(200).send({ id: admin.id, email: admin.email, accessToken: token, role: 'admin' });
                //no res.send({ success: true, id: admin.id , accessToken: token });
                //console.log("locataires connection established!") 

            }
        }
    }
}

const updateAdminParams = async(req, res) => {
    if (!req.body.email || !req.body.motDePasse) {
        res.status(400).send({
            message: "parameters can't be empty!"
        })
        return;
    }

    const patient_1 = await Admin.findOne({ where: { email: req.body.email } })
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
                const updatemedein = await Admin.update(
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
    getAllAdmins,
    getAdminByID,
    creatAdmin,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
    updateAdminParams
}