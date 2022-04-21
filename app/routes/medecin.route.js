import express from "express";
const router = express.Router();
import medecin from "../controllers/medecin.controller.js"

router.get('/', medecin.getAllMedecins)
router.get('/:id', medecin.getMedecinByID)
router.post('/add', medecin.creatMedecin)
router.put('/update/:id', medecin.updateMedecin)
router.delete('/:id', medecin.deleteMedecin)
router.post('/login', medecin.loginMedecin)


export default router;