import express from "express";
const router = express.Router();
import prochePatient from "../controllers/prochePatient.controller.js"

router.get('/', prochePatient.getAllProchePatient)
router.get('/patient/:id', prochePatient.getProchePatientByIdPatient)
router.get('/:id', prochePatient.getProchePatientByID)
router.post('/add', prochePatient.creatProchePatient)
router.put('/update/:id', prochePatient.updateProchePatient)
router.delete('/:id', prochePatient.deleteProchePatient)
router.post('/login', prochePatient.loginProche)
router.put('/updateParams/:id', prochePatient.updateProcheParams)



export default router;