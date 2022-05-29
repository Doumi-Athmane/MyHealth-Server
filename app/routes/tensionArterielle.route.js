import express from "express";
const router = express.Router();
import tensionArterielle from "../controllers/tensionArterielle.controller.js"

router.get('/:id_patient', tensionArterielle.getAllTensionArterielleByIDPatient)
router.get('/:id', tensionArterielle.getTensionArterielleByID)
router.post('/add', tensionArterielle.creatTensionArterielle)
    //router.put('/update/:id', tensionArterielle.updateConseil)
router.delete('/:id', tensionArterielle.deleteTensionArterielle)

export default router;