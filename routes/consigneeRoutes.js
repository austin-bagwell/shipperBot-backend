import { Router } from "express";
import * as consigneeControllers from "../controllers/consigneeControllers.js";
import { checkUser, requireAuth } from "../middleware/authMiddleware.js";

const router = new Router();

router.get("/consignees", requireAuth, checkUser, consigneeControllers.getAll);

// FIXME
// pretty sure this should turn into a URL query
// so that I can eventually add handling to update multiple
// consignees at once
router.get(
  "/consignees/:name",
  requireAuth,
  checkUser,
  consigneeControllers.getOne
);

router.post("/consignees", requireAuth, checkUser, consigneeControllers.getOne);

router.patch(
  "/consignees/:name",
  requireAuth,
  checkUser,
  consigneeControllers.updateOne
);

router.delete(
  "/consignees",
  requireAuth,
  checkUser,
  consigneeControllers.deleteAll
);

export { router as consigneeRoutes };
