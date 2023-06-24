import { Router } from "express";
import * as controller from "../controllers/authControllers.js";

const router = new Router();

router.get("/signup", controller.getSignup);
router.post("/signup", controller.postSignup);
router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);

export { router as authRoutes };
