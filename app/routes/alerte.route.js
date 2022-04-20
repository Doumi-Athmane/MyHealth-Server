import express from "express";
const router = express.Router();
import alerte from "../controllers/alerte.controller.js"

router.get('/:id_patient', alerte.getAllAlerteByIDPatient)
router.get('/:id_medecin', alerte.getAllAlerteByIDMedecin)
router.get('/:id', alerte.getAlerteByID)
router.post('/add', alerte.creatAlerte)
    //router.put('/update/:id', alerte.updateConseil)
router.delete('/:id', alerte.deleteAlerte)

export default router;