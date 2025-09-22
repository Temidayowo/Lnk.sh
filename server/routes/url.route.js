import express from "express";
import { generateAndSendUrl } from "../controllers/generateandsendurl.js";

const router = express.Router();

router.post("/shorten", generateAndSendUrl);

export default router;
