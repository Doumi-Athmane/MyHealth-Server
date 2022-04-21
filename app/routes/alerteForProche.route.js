import express from "express";
const router = express.Router();
import alerteForProche from "../controllers/alerteForProche.controller.js"

router.get('/:id_proche', alerteForProche.getAllalerteByProche)
router.post('/add', alerteForProche.creatAlerteForProche)
router.delete('/:id_frequance/:id_alerte', alerteForProche.deleteAlerteForProche)

export default router;