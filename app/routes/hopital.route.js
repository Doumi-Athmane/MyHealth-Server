import express from "express";
const router = express.Router();
import hopital from "../controllers/hopital.controller.js"

router.get('/', hopital.getAllHopitals)
router.get('/:id', hopital.getHopitalByID)
router.post('/add', hopital.creatHospital)
router.put('/update/:id', hopital.updateHopital)
router.delete('/:id', hopital.deleteHopital)

export default router;