import express from "express";
const router = express.Router();
import message from "../controllers/message.controller.js"


router.get('/:id', message.getAllMessageByMedecin)
router.post('/add', message.creatMessage)


export default router;