import express from "express";
const router = express.Router();
import alerteForProche from "../controllers/alerteForProche.controller.js"

router.get('/:id_proche', alerteForProche.getAllalerteByProche)
router.post('/add', alerteForProche.creatAlerteForProche)
router.delete('/:id_proche/:id_alerte', alerteForProche.deleteAlerteForProche)

export default router;