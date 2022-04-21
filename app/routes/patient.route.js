import express from "express";
const router = express.Router();
import patient from "../controllers/patient.controller.js"

router.get('/', patient.getAllPatients)
router.get('/:id', patient.getPatientByID)
router.post('/add', patient.creatPatient)
router.put('/update/:id', patient.updatePatient)
router.delete('/:id', patient.deletePatient)
router.post('/login', patient.loginPatient)


export default router;