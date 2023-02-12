import { Router } from "express";
import * as authControllers from "../controllers/authControllers.js";

const router = new Router();

router.get("/signup", authControllers.signup_get);
router.post("/signup", authControllers.signup_post);
router.get("/login", authControllers.login_get);
router.post("/login", authControllers.login_post);

export { router as authRoutes };
