import express from "express";
const router = express.Router();
import hopitalHasSpecialite from "../controllers/hopitalHasSpecialite.controller.js"

router.get('/:idhopital', hopitalHasSpecialite.getAllspecialiteByHopital)
router.get('/:idspecialite', hopitalHasSpecialite.getAllhopitalBySpecialite)
router.post('/add', hopitalHasSpecialite.creatHopitalHasSpecialite)
router.delete('/:idhopital/:idspecialite', hopitalHasSpecialite.deleteHopitalHasSpecialite)

export default router;