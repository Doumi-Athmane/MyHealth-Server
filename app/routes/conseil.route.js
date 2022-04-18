import express from "express";
const router = express.Router();
import conseil from "../controllers/conseil.controller.js"

router.get('/', conseil.getAllConseils)
router.get('/:id', conseil.getConseilByID)
router.post('/add', conseil.creatConseil)
router.put('/update/:id', conseil.updateConseil)
router.delete('/:id', conseil.deleteConseil)

export default router;