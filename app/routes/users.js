import express from "express";
import { testFunction } from "../controllers/users.js"
const router = express.Router();

router.get('/', testFunction)

export default router;