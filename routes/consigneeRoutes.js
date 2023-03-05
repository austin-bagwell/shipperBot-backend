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
  consigneeControllers.consignees_get_one
);

router.post(
  "/consignees",
  requireAuth,
  checkUser,
  consigneeControllers.consignees_add_one
);

router.patch(
  "/consignees/:name",
  requireAuth,
  checkUser,
  consigneeControllers.consignees_update_one
);

router.delete(
  "/consignees",
  requireAuth,
  checkUser,
  consigneeControllers.consignees_delete_all
);

export { router as consigneeRoutes };
