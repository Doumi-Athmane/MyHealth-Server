import express from "express";
const router = express.Router();
import admin from "../controllers/administrateur.controller.js"

router.get('/', admin.getAllAdmins)
router.get('/:id', admin.getAdminByID)
router.post('/add', admin.creatAdmin)
router.put('/update/:id', admin.updateAdmin)
router.delete('/:id', admin.deleteAdmin)

export default router;