import express from "express";
const router = express.Router();
import alerte from "../controllers/alerte.controller.js"

router.get('/:id_patient', alerte.getAllAlerteByIDPatient)
router.get('/med/:id_medecin', alerte.getAllAlerteByIDMedecin)
router.get('/id/:id', alerte.getAlerteByID)
router.post('/add/:id_frequance', alerte.creatAlerte)
router.delete('/:id', alerte.deleteAlerte)
router.get('/time/:id', alerte.getLastAlerteByIDPatient)
router.get('/',alerte.getAllAlertes)
export default router;









