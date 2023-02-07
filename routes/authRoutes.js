import { Router } from "express";

const router = new Router();

// callback will be definedin authControllers.js
router.get("/signup", (req, res) => {});
router.post("/signup", (req, res) => {});
router.get("/login", (req, res) => {});
router.post("/login", (req, res) => {});
router.get("/consignees", (req, res) => {});
router.post("/consignees", (req, res) => {});

export { router as authRoutes };
