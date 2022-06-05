import express from "express";
const router = express.Router();
import frequanceCardiaque from "../controllers/frequanceCardiaque.controller.js"

router.get('/:id_patient', frequanceCardiaque.getAllFrequanceCardiqueByIDPatient)
router.get('/patient/:id_patient', frequanceCardiaque.getAllFrequanceCardiqueByIDPatient)
router.get('/:id', frequanceCardiaque.getFrequanceCardiaqueByID)
router.post('/add', frequanceCardiaque.creatFrequanceCardiaque)
    //router.put('/update/:id', frequanceCardiaque.updateConseil)
router.delete('/:id', frequanceCardiaque.deleteFrequanceCardiaque)

export default router;