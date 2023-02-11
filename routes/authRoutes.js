import { Router } from "express";
import * as authControllers from "../controllers/authControllers.js";

const router = new Router();

// FIXME get and post signup and get login don't need to be authRoutes I think
// callback will be definedin authControllers.js
router.get("/signup", authControllers.signup_get);
router.post("/signup", authControllers.signup_post);
router.get("/login", authControllers.login_get);
router.post("/login", authControllers.login_post);
// FIXME these need to move to their own module
router.get("/consignees", authControllers.consignees_get);
router.post("/consignees", authControllers.consignees_post);

export { router as authRoutes };
