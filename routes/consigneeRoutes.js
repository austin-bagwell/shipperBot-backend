import { Router } from "express";
import * as consigneeControllers from "../controllers/consigneeControllers.js";
import { checkUser, requireAuth } from "../middleware/authMiddleware.js";

const router = new Router();

router.get(
  "/consignees",
  requireAuth,
  checkUser,
  consigneeControllers.consignees_get_all
);

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

router.put(
  "/consignees",
  requireAuth,
  checkUser,
  consigneeControllers.consignees_update_one
);

// TODO should these actually live under User routes?
// I need to do this to work with any consignees:
// /users/:userId/consignees/:consigneeId
// where :userId/:consigneeId are captured in req.params
// assuming I'm storing :userId on the frontend (or as a token?) and sending w/ each request
// then again, my checkUser middleware is already doing that with the jwt token, I think
// might not be needed to include userId in the API route

// Other routes I'll need to access consignees resources?
// consignees/:id - get and post, for editing a single consignee
// consignees/:batch - ??? edit multiple consignees via csv upload
// consignees/delete

// some idea from Build APIs You Wont Hate
/*
CONSIGNEES  
--create
--read
--update
--delete
--list (by name/id)(supports pagination)

*/
export { router as consigneeRoutes };
