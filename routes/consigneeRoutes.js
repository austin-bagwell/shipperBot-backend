import { Router } from "express";
import * as consigneeControllers from "../controllers/consigneeControllers.js";
import { checkUser } from "../middleware/authMiddleware";

const router = new Router();

router.get("/consignees", checkUser, consigneeControllers.consignees_get);
router.post("/consignees", checkUser, consigneeControllers.consignees_post);

export { router as consigneeRoutes };
