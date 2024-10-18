import express from "express";
import { getKlinesController } from "../controllers/binanceControllerKlines.js";

const router = express.Router();

router.get("/klines", getKlinesController);

export default router;
