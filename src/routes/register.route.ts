import { Router } from "express";
import { register } from "../controllers";
const router = Router();

router.post("/", register);

export default router;
