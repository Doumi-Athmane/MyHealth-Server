import express from "express";
import { loginPatient, loginMedecin, loginAdministrateur, loginProchePatient } from "../controllers/users.js"
const router = express.Router();

router.get('/patient', loginPatient)
router.get('/medecin', loginMedecin)
router.get('/administrateur', loginAdministrateur)
router.get('/prochePatient', loginProchePatient)


export default router;