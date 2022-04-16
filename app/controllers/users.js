import client from "../../config.js";


export const loginPatient = (req, res) => {
    client.query(`select * from patient`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            console.log(err)
        }
    })
}

export const loginMedecin = (req, res) => {
    client.query(`select * from medecin`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            console.log(err)
        }
    })
}

export const loginAdministrateur = (req, res) => {
    client.query(`select * from administrateur`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            console.log(err)
        }
    })
}

export const loginProchePatient = (req, res) => {
    client.query(`select * from proche_patient`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            console.log(err)
        }
    })
}