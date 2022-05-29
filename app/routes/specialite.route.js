import express from "express";
const router = express.Router();
import specialite from "../controllers/specialite.controller.js"

router.get('/', specialite.getAllSpecialites)
router.get('/:id', specialite.getSpecialiteByID)
router.post('/add', specialite.creatSpecialite)
router.put('/update/:id', specialite.updateSpecialite)
router.delete('/:id', specialite.deleteSpecialite)






export default router;