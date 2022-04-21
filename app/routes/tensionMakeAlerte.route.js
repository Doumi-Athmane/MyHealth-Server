import express from "express";
const router = express.Router();
import tensionMakeAlerte from "../controllers/tensionMakeAlerte.controller.js"

router.get('/:id_tension', tensionMakeAlerte.getAlerteByTension)
router.get('/:id_alerte', tensionMakeAlerte.getAlltensionByAlerte)
router.post('/add', tensionMakeAlerte.creatTansionMakeAlerte)
router.delete('/:id_frequance/:id_alerte', tensionMakeAlerte.deleteTensionArterielle)

export default router;