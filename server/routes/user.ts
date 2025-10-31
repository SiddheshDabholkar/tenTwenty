import express from "express";
import { getAllUsers, getUser } from "../controller/user";
import { adminMiddleware } from "../middleware/role";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/get/all", authMiddleware, adminMiddleware, getAllUsers);
router.get("/:id", authMiddleware, adminMiddleware, getUser);

export default router;
