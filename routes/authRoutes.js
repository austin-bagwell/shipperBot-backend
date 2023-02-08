import { Router } from "express";
import * as authControllers from "../controllers/authControllers.js";

const router = new Router();

// callback will be definedin authControllers.js
router.get("/signup", authControllers.signup_get);
router.post("/signup", authControllers.signup_post);
router.get("/login", authControllers.login_get);
router.post("/login", authControllers.login_post);
router.get("/consignees", authControllers.consignees_get);
router.post("/consignees", authControllers.consignees_post);

export { router as authRoutes };
