import express from "express";
const router = express.Router();
import frequanceMakeAlerte from "../controllers/frequenceMakeAlerte.controller.js"

router.get('/:id_frequance', frequanceMakeAlerte.getAlerteByFrequance)
router.get('/:id_alerte', frequanceMakeAlerte.getAllfrequenceByAlerte)
router.post('/add', frequanceMakeAlerte.creatFrequanceMakeAlerte)
router.delete('/:id_frequance/:id_alerte', frequanceMakeAlerte.deleteFrequanceMakeAlerte)

export default router;