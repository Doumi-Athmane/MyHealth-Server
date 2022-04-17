import client from "../../config.js";

export const createPatient = (req, res) => {
    client.query(`insert into patient (nom,prenom)`)
}

export const loginPatient = (req, res) => {
    client.query(`select * from patient`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            console.log(err)
        }
    })
}