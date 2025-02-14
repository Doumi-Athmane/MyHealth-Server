import express from "express";
const router = express.Router();
import patient from "../controllers/patient.controller.js"

router.get('/', patient.getAllPatients)
router.get('/:id', patient.getPatientByID)
router.get('/medecin/:id_medecin', patient.getAllPatientByIDMedecin)
router.post('/add', patient.creatPatient)
router.put('/update/:id', patient.updatePatient)
router.delete('/:id', patient.deletePatient)
router.post('/login', patient.loginPatient)
router.put('/updateParams/:id', patient.updatePatientParams)
router.get('/med/:id', patient.getPatientMedByID)


export default router;